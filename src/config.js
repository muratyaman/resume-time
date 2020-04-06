// file used by App.jsx and ../server.js

// @see https://github.com/motdotla/dotenv
const dotenv = require('dotenv');
dotenv.config();

const pe = process.env;

// TODO: validate settings

module.exports = {
  appTitle: pe.REACT_APP_TITLE,
  appVersion: pe.REACT_APP_VERSION,
  appDesc: pe.REACT_APP_DESC,
  credits: pe.REACT_APP_CREDITS,
  serverPort: pe.REACT_APP_SERVER_PORT,
  dbConfig: {
    knex: {
      client: 'sqlite3',
      connection: {
        // path relative to root of repo
        filename: './data/db.sqlite3',
      },
    },
    tables: {
      resumes: {
        name: 'tbl_resumes',
        definition: function(tbl) {
          tbl.uuid('id').primary();
          tbl.string('username', 50).notNullable().unique();
          tbl.text('password_hash').notNullable();
          tbl.string('url', 250).notNullable();
          tbl.datetime('created_at', { useTz: true }).nullable();
          tbl.datetime('updated_at', { useTz: true }).nullable();
        },
        fields: ['id', 'username', 'password_hash', 'url', 'created_at', 'updated_at'],
        create_form: ['username', 'url', 'password', 'password_confirm'],
        update_form: ['username', 'url', 'password', 'password_confirm'],
        hidden: ['password_hash'],
      },
    },
  }
};
