const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');

const app = express();
app.use(express.json());
app.use(cors());

const genQueryGetDatabases = () => {
  return 'SELECT datname FROM pg_database';
};

const genQueryGetTables = (databaseName) => {
  return `SELECT table_name FROM information_schema.tables WHERE table_catalog='${databaseName}' AND table_schema='public'`;
};

const genQueryCreateDatabase = (databaseName) => {
  return `CREATE DATABASE ${databaseName}`;
};

const genQueryRenameDatabase = (databaseNameOld, databaseNameNew) => {
  return `ALTER DATABASE ${databaseNameOld} RENAME TO ${databaseNameNew}`;
};

const genQueryDropDatabase = (databaseName) => {
  return `DROP DATABASE ${databaseName}`;
};

// LOGIN
app.post('/login', (req, res) => {
  const { user, password, host, database } = req.body.config;
  sendQuery
    .checkConfig({ user, password, host, database })
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => res.json({ error: error }));
});

// GET DATABASES
app.post('/databases', (req, res) => {
  const { user, password, host, database } = req.body.config;
  sendQuery
    .sendQuery({ user, password, host, database }, genQueryGetDatabases())
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
  const { user, password, host, database, databaseName } = req.body.config;
  sendQuery
    .sendQuery({ user, password, host, database }, genQueryCreateDatabase(databaseName))
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

// DROP DATABASE
app.post('/drop_database', (req, res) => {
  const { user, password, host, database, databaseName } = req.body.config;

  sendQuery
    .sendQuery({ user, password, host, database }, genQueryDropDatabase(databaseName))
    .then(() => {
      res.json(databaseName);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error });
    });
});

// RENAME DATABASE
app.post('/rename_database', (req, res) => {
  const { user, password, host, database, databaseNameOld, databaseNameNew } = req.body.config;

  sendQuery
    .sendQuery(
      { user, password, host, database },
      genQueryRenameDatabase(databaseNameOld, databaseNameNew),
    )
    .then(() => {
      res.json(databaseNameNew);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error });
    });
});

// GET TABLES
app.post('/tables', (req, res) => {
  const { user, password, host, currentDb } = req.body.config;
  const database = currentDb;
  console.log(user, password, host, database);

  sendQuery
    .sendQuery({ user, password, host, database }, genQueryGetTables(database))
    .then((resp) => {
      console.log(resp);
      res.json(resp.map((item) => item.table_name));
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// GET TABLE INFO
// app.post('/table_info', (req, res) => {
//   const config = req.body.config;
//   const database = req.body.database;
//   const tableName = req.body.table;
//
//   sendQuery
//     .sendQuery(config, queries.table_info, [tableName, database])
//     .then((resp) => {
//       res.json(resp);
//     })
//     .catch((error) => {
//       res.json({ error: 'Tables fetch error.' });
//     });
// });

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
