const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');
const queries = require('./queries');

const app = express();
app.use(express.json());
app.use(cors());

// LOGIN
app.post('/login', (req, res) => {
  const { user, password, host, database } = req.body.config;
  sendQuery
    .checkConfig({ user, password, host, database })
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => res.json({ error: error.message }));
});

// --------DATABASES--------

// GET DATABASES
app.post('/databases', (req, res) => {
  const { user, password, host, database } = req.body.config;
  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryGetDatabases())
    .then((resp) => {
      if (resp.error) {
        throw Error(resp.error);
      } else {
        res.json(resp.map((item) => item.datname));
      }
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// CREATE DATABASE
app.post('/create_database', (req, res) => {
  const { user, password, host, database, currentDb } = req.body.config;
  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryCreateDatabase(currentDb))
    .then((resp) => {
      if (resp.error) {
        throw Error(resp.error);
      } else {
        res.json('Create database success.');
      }
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// DROP DATABASE
app.post('/drop_database', (req, res) => {
  const { user, password, host, database, currentDb } = req.body.config;

  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryDropDatabase(currentDb))
    .then(() => {
      res.json(currentDb);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// RENAME DATABASE
app.post('/rename_database', (req, res) => {
  const { user, password, host, database, currentDb, newDbName } = req.body.config;

  sendQuery
    .sendQuery(
      { user, password, host, database },
      queries.genQueryRenameDatabase(currentDb, newDbName),
    )
    .then(() => {
      res.json(newDbName);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// --------TABLES--------

// GET TABLES
app.post('/tables', (req, res) => {
  const { user, password, host, currentDb } = req.body.config;
  const database = currentDb;

  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryGetTables(database))
    .then((resp) => {
      res.json(resp.map((item) => item.table_name));
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// CREATE TABLE
app.post('/create_table', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, tableName, columns } = config;

  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryCreateTable(tableName, columns))
    .then((resp) => {
      res.json({ success: 'CREATE_TABLE_SUCCESS' });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// DROP TABLE
app.post('/drop_table', (req, res) => {
  const config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, tableName } = config;

  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryDropTable(tableName))
    .then(() => {
      res.json(tableName);
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

// GET COLUMNS
app.post('/get_columns', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, tableName } = config;

  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryGetColumns(tableName))
    .then((resp) => {
      res.json({ success: 'GET_COLUMNS_SUCCESS', data: resp });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
