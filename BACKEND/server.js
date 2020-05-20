const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');

const app = express();
app.use(express.json());
app.use(cors());

const queries = {
  databases: 'SELECT datname FROM pg_database',
  create_database: 'CREATE DATABASE ',
  drop_database: 'DROP DATABASE ',

  rename_database: 'RENAME DATABASE $1 TO $2 ', //TODO: SYNTAX?
  tables:
    'SELECT table_name FROM information_schema.tables WHERE table_catalog=$1 AND table_schema=$2',
  table_info:
    'SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name=$1 and table_catalog=$2',
};

app.post('/login', (req, res) => {
  const config = req.body.config;
  sendQuery.checkConfig(config).then((resp) => {
    res.json(resp);
  });
});

app.post('/databases', (req, res) => {
  const config = req.body.config;
  sendQuery
    .sendQuery(config, queries.databases)
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

app.post('/create_database', (req, res) => {
  const { user, password, host, database, databaseName } = req.body.config;
  sendQuery
    .sendQuery({ user, password, host, database }, queries.create_database + databaseName)
    .then((resp) => {
      if (resp.error) {
        throw Error(resp.error);
      } else {
        res.json('Create database success.');
      }
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

app.post('/drop_database', (req, res) => {
  const { user, password, host, database, databaseName } = req.body.config;
  console.log({ user, password, host, database, databaseName });
  sendQuery
    .sendQuery({ user, password, host, database }, queries.drop_database + databaseName)
    .then(() => {
      res.json(databaseName);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error });
    });
});

app.post('/rename_database', (req, res) => {
  const { user, password, host, database, databaseName } = req.body.config;
  console.log({ user, password, host, database, databaseName });
  sendQuery
    .sendQuery(
      { user, password, host, database },
      'ALTER DATABASE ' + database + ' RENAME TO ' + databaseName,
    )
    .then(() => {
      res.json(databaseName);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error });
    });
});

app.post('/tables', (req, res) => {
  const { config } = req.body;
  sendQuery
    .sendQuery(config, queries.tables, [config.database, 'public'])
    .then((resp) => {
      res.json(resp.map((item) => item.table_name));
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

app.post('/table_info', (req, res) => {
  const config = req.body.config;
  const database = req.body.database;
  const tableName = req.body.table;

  sendQuery
    .sendQuery(config, queries.table_info, [tableName, database])
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.json({ error: 'Tables fetch error.' });
    });
});

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
