const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  console.log(req.body);
  res.json('login ok');
});

app.listen(800, '127.0.0.1', () => console.log('Address: 127.0.0.1:800'));
