const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');
const queries = require('./queries');
const formatData = require('./utils');
const port = process.env.PORT || 800;

const app = express();
app.use(express.json());
app.use(cors());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('build'));
// }

app.use(express.static('build'));

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
      res.json({ error: error });
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
      res.json({ error: error });
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
      res.json({ error: error });
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

// ##### GET TABLES #####
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

// #####  CREATE TABLE  #####
app.post('/create_table', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, tableData, primaryKey } = config;

  sendQuery
    .sendQuery(
      { user, password, host, database },
      queries.genQueryCreateTable(tableData, primaryKey),
    )
    .then(() => {
      res.json({ success: 'CREATE_TABLE_SUCCESS' });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

//  ##### RENAME TABLE #####
app.post('/rename_table', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, currentTbl, newTableName } = config;

  sendQuery
    .sendQuery(
      { user, password, host, database },
      queries.genQueryRenameTable(currentTbl, newTableName),
    )
    .then(() => {
      res.json({ success: 'RENAME_TABLE_SUCCESS' });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

//  ##### DROP TABLE #####
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
      res.json({ error: error.message });
    });
});

//  ##### GET TABLE SCHEMA #####
app.post('/get_table_schema', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, currentTbl } = config;

  sendQuery
    .sendQuery({ user, password, host, database }, queries.genQueryGetTableSchema(currentTbl))
    .then((resp) => {
      const data = formatData.formatQueryDataInsert(currentTbl, resp);
      res.json({ success: 'GET_TABLE_SCHEMA_SUCCESS', data });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

//  ##### INSERT INTO TABLE #####
app.post('/insert_table', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, currentTbl, insertData } = config;
  console.log(config);

  sendQuery
    .sendQuery(
      { user, password, host, database },
      queries.genQueryInsertTable(currentTbl, insertData),
    )
    .then(() => {
      res.json({ success: 'INSERT_TABLE_SUCCESS' });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

//  ##### GET ALL FROM TABLE #####
app.post('/select_tableAll', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, currentTbl, order } = config;

  sendQuery
    .sendQuery(
      { user, password, host, database },
      queries.genQuerySelectAllTable(currentTbl, order),
    )
    .then((resp) => {
      res.json({ success: 'GET_COLUMNS_ALL_SUCCESS', data: resp });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

//  ##### GET WHERE FROM TABLE #####
app.post('/select_tableWhere', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, currentTbl, searchColumn, searchValue } = config;

  sendQuery
    .sendQuery(
      { user, password, host, database },
      queries.genQuerySelectWhere(currentTbl, searchColumn, searchValue),
    )
    .then((resp) => {
      res.json({ success: 'GET_COLUMNS_WHERE_SUCCESS', data: resp });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

//  ##### UPDATE TABLE #####
app.post('/update_row', (req, res) => {
  let config = req.body.config;
  config.database = config.currentDb;
  const { user, password, host, database, currentTbl, oldRowData, newRowData } = config;

  sendQuery
    .sendQuery(
      { user, password, host, database },
      queries.genQueryUpdateRow(currentTbl, oldRowData, newRowData),
    )
    .then(() => {
      res.json({ success: 'UPDATE_TABLE_SUCCESS' });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

app.listen(port, '127.0.0.1', () => console.log(`Listen on: ${port}`));
