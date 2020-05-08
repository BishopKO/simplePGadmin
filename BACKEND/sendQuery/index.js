const { Client } = require('pg');

function checkConfig(config) {
  const client = new Client(config);
  return new Promise((resolve) => {
    client.connect((err) => {
      if (err) {
        client.end();
        resolve({ error: 'Login error.' });
      } else {
        client.end();
        resolve({ success: 'Login success.' });
      }
    });
  });
}

function sendQuery(config, query, params = []) {
  return new Promise((resolve) => {
    const client = new Client(config);

    client.connect((error) => {
      if (error) {
        console.log('Client error: ', error.stack);
        resolve({ error: 'Connection error' });
      } else {
        client
          .query(query, params)
          .then((response) => {
            client.end();
            resolve(response.rows.map((item) => item.datname));
          })
          .catch((error) => resolve(error.stack.split('\n')[0]));
      }
    });
  });
}

module.exports = { sendQuery, checkConfig };
