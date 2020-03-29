const express = require('express');
const config  = require('./src/config');
const yaml    = require('js-yaml');
const path    = require('path');
const fs      = require('fs');

const app = express();
const port = config.serverPort;

// serve assets of react app
app.use(express.static('build'));

// serve albums behind '/api/albums'
//app.use(express.static('assets'));

function convertYamlToJson(file) {
  let data = null;
  try {
    const filePath = path.resolve(config.uploadsRootDir, file + '.yaml');
    const cvYaml = fs.readFileSync(filePath, 'utf8');
    data = yaml.safeLoad(cvYaml);
  } catch (err) {
    console.error('convertYamlToJson error', err.message);
  }
  return data;
}

function health(){
  return {
    app: config.appTitle,
    version: config.appVersion,
    ts: new Date().toISOString(),
  };
}

app.get('/api/cv/:file', (req, res) => {
  const data = convertYamlToJson(req.params.file);
  res.json({ data });
});

app.get('/api/health', (req, res) => res.json(health()));
app.get('/health', (req, res) => res.json(health()));

app.listen(port, () => console.log(`${config.appTitle} listening on port ${port}!`));
