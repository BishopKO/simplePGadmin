const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const config = req.body;
  sendQuery
    .sendQuery(config, 'select usename from pg_user where usename=$1', [config.user])
    .then((resp) => res.json(resp))
    .catch((err) => {
      console.log(err.stack);
      res.json({ error: 'Login error.' });
    });
});

app.post('/databases', (req, res) => {
  sendQuery
    .sendQuery(clientConnection, 'select datname from pg_database')
    .then((resp) => res.json(resp));
});

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
