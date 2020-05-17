const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');

const app = express();
app.use(express.json());
app.use(cors());

const queries = {
  databases: 'SELECT datname FROM pg_database',
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
        res.json(resp.data.map((item) => item.datname));
      }
    })
    .catch((error) => {
      console.log({ error: 'Express /databases error.' });
    });
});

app.post('/tables', (req, res) => {
  const { config } = req.body;
  sendQuery
    .sendQuery(config, queries.tables, [config.database, 'public'])
    .then((resp) => {
      res.json(resp.data.map((item) => item.table_name));
    })
    .catch((error) => {
      console.log(error.message);
      res.json({ error: error.message });
    });
});

app.post('/table_info', (req, res) => {
  const config = req.body.config;
  const database = req.body.database;
  const table = req.body.table;

  sendQuery
    .sendQuery(config, queries.table_info, [table, database])
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      console.log(error.stack);
      res.json({ error: 'Tables fetch error.' });
    });
});

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
