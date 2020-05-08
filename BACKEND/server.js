const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');

const app = express();
app.use(express.json());
app.use(cors());

const queries = {
  databases: 'select datname from pg_database',
};

app.post('/login', (req, res) => {
  const config = req.body.config;
  if (config) {
    sendQuery.checkConfig(config).then((resp) => res.json(resp));
  } else {
    res.json({ error: 'Login error.' });
  }
});

app.post('/databases', (req, res) => {
  const config = req.body.config;
  console.log('Databases:', config);
  sendQuery
    .sendQuery(config, queries.databases)
    .then((resp) => res.json(resp))
    .catch((error) => {
      console.log(error.stack);
      res.json({ error: 'Databases fetch error.' });
    });
});

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
