const axios      = require('axios');
const bcrypt     = require('bcrypt');
const express    = require('express');
const bodyParser = require('body-parser');
const yaml       = require('js-yaml');
const knex       = require('knex');
const uuid       = require('uuid');
const config     = require('./src/config');

const db = knex(config.dbConfig.knex);
const app = express();

function securityCheckUsername(username) {
  const usernameLower = String(username).trim().toLowerCase();
  if (username !== usernameLower) throw new Error('invalid username');
  if (username.length < 3) throw new Error('username too short');

  const pattern = /[a-z0-9\-\_]+/;
  const found = username.match(pattern);
  if (!found) throw new Error('invalid username');

  return true;
}

function securityCheckPassword(password, password_confirm) {
  password = String(password).trim();
  // do NOT touch password_confirm
  if (password.length < 8) throw new Error('password too short');
  if (password !== password_confirm) throw new Error('confirm password');

  const patterns = [
    /[A-Z]+/, // at least 1 upper-case letter
    /[a-z]+/, // at least 1 lower-case letter
    /[0-9]+/, // at least 1 number
    /[\,\.\/\;\:\'\"\|\!\@\£\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}]+/, // at least 1 special char
  ];

  patterns.forEach(pattern => {
    const found = password_confirm.match(pattern);
    if (!found) throw new Error('insecure password');
  });

  return true;
}

async function securityHash(plainText, saltRounds = 10) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainText, saltRounds, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

async function securityCompare(plainText, hashedText) {
  return await bcrypt.compare(plainText, hashedText);
}

function securityCheckUrl(url) {
  if (typeof url !== 'string') throw new Error('invalid url');
  const s = String(url).trim();
  if (!s.startsWith('https://') && !s.startsWith('http://')) {
    throw new Error('invalid url');
  }
  // TODO: improve
  const pattern = new RegExp(
    '^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if (!s.match(pattern)) throw new Error('invalid url');
  return true;
}

function convertYamlToJson(yamlText) {
  let data = null;
  try {
    //const filePath = path.resolve(config.uploadsRootDir, file + '.yaml');
    //const yamlText = fs.readFileSync(filePath, 'utf8');
    data = yaml.safeLoad(yamlText);
  } catch (err) {
    console.error('convertYamlToJson error', err.message);
  }
  return data;
}

async function dbCheckTable(db, tbl) {
  console.log('dbCheckTable', tbl, '...');
  const found = await db.schema.hasTable(tbl.name);
  if (found) {
    console.log('dbCheckTable', tbl, '... found!', found);
  } else {
    console.warn('dbCheckTable', tbl, '... not found!');
    console.log('dbCheckTable', tbl, 'creating ...');
    const result = await db.schema.createTable(tbl.name, tbl.definition);
    console.log('dbCheckTable', tbl, 'creating ... done!', result);
  }
  return Promise.resolve(true);
}

async function dbInit(db) {
  let tbl, key, tableKeys = Object.keys(config.dbConfig.tables);
  for (let i = 0; i < tableKeys.length; i++) {
    key = tableKeys[i];
    tbl = config.dbConfig.tables[key];
    await dbCheckTable(db, tbl);
  }
}

async function dbResumeRetrieveByUsername(db, username) {
  const result = await db.select()
    .from(config.dbConfig.tables.resumes.name)
    .where('username', username)
    .limit(1);
  console.log('dbResumeRetrieveByUsername result', result);
  return result[0] ? result[0] : null;
}

async function dbResumeCreate(db, row) {
  const result = await db.insert(row)
    .into(config.dbConfig.tables.resumes.name)
    .returning('id');
  // NOTE: .returning() is not supported by sqlite3
  // so, result[0] is the count of inserted records
  console.log('dbResumeCreate result', result);
  return (result && result[0]) ? row.id : null;
}

async function dbResumeUpdateByUsername(db, username, row) {
  const result = await db(config.dbConfig.tables.resumes.name)
    .where('username', username)
    .update(row, ['id']);
  // NOTE: .returning() is not supported by sqlite3
  // so, result[0] is the count of updated records
  console.log('dbResumeUpdate result', result);
  return result;
}

async function dbResumeDeleteByUsername(db, username) {
  const result = await db(config.dbConfig.tables.resumes.name)
    .where('username', username)
    .del();
  // result[0] is the count of deleted records
  console.log('dbResumeDelete result', result);
  return (result && result[0]) ? result[0] : null;
}

function health(){
  return {
    app: config.appTitle,
    version: config.appVersion,
    ts: new Date().toISOString(),
  };
}

function apiHealth(req, res) {
  return res.json(health());
}

function objRemoveKeys(obj, includeKeyList = [], excludeKeyList = []) {
  // remove fields which are not in our table
  const objKeys = Object.keys(obj);
  objKeys.forEach(key => {
    if (includeKeyList.length && !includeKeyList.includes(key)) {
      delete obj[key];
    }
    if (excludeKeyList.length && excludeKeyList.includes(key)) {
      delete obj[key];
    }
  });
  return obj;
}

async function apiResumesCreate(req, res) {
  let data = null, error = null;
  try {
    let row = Object.assign({}, req.body);
    let { username = '', password = '', password_confirm = '', url = '' } = row;

    securityCheckUsername(username);
    securityCheckPassword(password, password_confirm);
    securityCheckUrl(url);

    const rowFound = await dbResumeRetrieveByUsername(db, username);
    if (rowFound) throw new Error('username taken');

    // remove unexpected fields which are not in our table
    objRemoveKeys(row, config.dbConfig.tables.resumes.create_form);

    const password_hash = await securityHash(password);

    const overrides = {
      id: uuid.v4(),
      username,
      password_hash,
      url, // TODO: validate
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let newRow = Object.assign({}, row, overrides);
    objRemoveKeys(newRow, config.dbConfig.tables.resumes.fields);

    const insertedId = await dbResumeCreate(db, newRow);
    data = insertedId ? insertedId : null;
  } catch (err) {
    error = err.message;
  }
  res.json({ data, error });
}

async function apiResumesRetrieve(req, res) {
  let data = null, error = null;
  try {
    let { username } = req.params;
    securityCheckUsername(username);

    const row = await dbResumeRetrieveByUsername(db, username);
    if (!row) throw new Error('resume not found');

    // exclude hidden fields
    objRemoveKeys(row, [], config.dbConfig.tables.resumes.hidden);

    data = row;
  } catch (err) {
    error = err.message;
  }
  res.json({ data, error });
}

async function apiResumesUpdate(req, res) {
  let data = null, error = null;
  try {
    let { username = '' } = req.params;

    securityCheckUsername(username);
    const currentPassword = req.header('x-password');

    const row = await dbResumeRetrieveByUsername(db, username);
    if (!row) throw new Error('resume not found');

    const passwordMatch = await securityCompare(currentPassword, row.password_hash);
    if (!passwordMatch) throw new Error('incorrect password');

    // remove unexpected fields which are not in our table or not updatable
    let newRow = Object.assign({}, req.body);
    objRemoveKeys(newRow, config.dbConfig.tables.resumes.update_form);

    let { url = '', username: newUsername = '', password: newPassword = '', password_confirm = '' } = newRow;

    let overrides = Object.assign({}, newRow, {
      updated_at: new Date().toISOString(),
    });

    if (url !== '') {
      securityCheckUrl(url);
      overrides.url = String(url).trim(); // TODO: validate
    }

    if (newUsername && (username !== newUsername)) { // updating username
      const rowFound = await dbResumeRetrieveByUsername(db, username);
      if (!rowFound) throw new Error('username not unique');

      overrides.username = newUsername;
    }

    if (newPassword !== '' && password_confirm !== '') { // updating password
      securityCheckPassword(newPassword, password_confirm);
      overrides.password_hash = await securityHash(newPassword);
    }

    objRemoveKeys(overrides, config.dbConfig.tables.resumes.fields);

    data = await dbResumeUpdateByUsername(db, username, overrides);
  } catch (err) {
    error = err.message;
  }
  res.json({ data, error });
}

async function apiResumesRetrieveFileJson(req, res) {
  let data = null, error = null;
  try {
    let { username } = req.params;
    username = String(username).trim().toLowerCase();
    if (username === '') throw new Error('invalid username');

    const row = await dbResumeRetrieveByUsername(db, username);
    if (!row) throw new Error('resume not found');

    const { url } = row;
    const cvResponse = await axios.get(url);
    const yamlText = cvResponse.data; // body
    if (yamlText === '') throw new Error('resume blank or invalid');

    data = convertYamlToJson(yamlText);
  } catch (err) {
    error = err.message;
  }
  res.json({ data, error });
}

async function apiResumesDelete(req, res) {
  let data = null, error = null;
  try {
    let { username } = req.params;
    username = String(username).trim().toLowerCase();
    if (username === '') throw new Error('invalid username');

    const rowFound = await dbResumeRetrieveByUsername(db, username);
    if (!rowFound) throw new Error('resume not found');

    const deleted = await dbResumeDeleteByUsername(db, username);
    if (!deleted) throw new Error('resume not deleted');

    data = deleted;
  } catch (err) {
    error = err.message;
  }
  res.json({ data, error });
}

function appInit(app) {
  // serve assets of react app
  app.use(express.static('build'));

  const jsonParser = bodyParser.json();

  app.get('/api/resumes/:username/json', apiResumesRetrieveFileJson);
  app.get('/api/resumes/:username', apiResumesRetrieve);
  app.put('/api/resumes/:username', jsonParser, apiResumesUpdate);
  app.patch('/api/resumes/:username', jsonParser, apiResumesUpdate);
  app.delete('/api/resumes/:username', apiResumesDelete);
  app.post('/api/resumes', jsonParser, apiResumesCreate);

  app.get('/api/health', apiHealth);
  app.get('/api', apiHealth);
  app.get('/health', apiHealth);
}

dbInit(db).then(() => {
  appInit(app);
  app.listen(config.serverPort, () => {
    console.log(`${config.appTitle} listening on port ${config.serverPort}!`);
  });
});

