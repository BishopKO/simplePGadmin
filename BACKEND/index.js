const express = require('express');
const cors = require('cors');
const sendQuery = require('./sendQuery');

const app = express();
app.use(express.json());
app.use(cors());

const testConfig = {
  user: 'bishop',
  password: 'ghost14',
  database: 'users',
  host: 'localhost',
};

app.post('/login', (req, res) => {
  const config = req.body;
  console.log(config);
  sendQuery
    .sendQuery(config, 'select usename from pg_user where usename=$1', [config.user])
    .then((resp) => res.json(resp));
});

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
