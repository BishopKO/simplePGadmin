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
  return new Promise((resolve, reject) => {
    const client = new Client(config);
    client.connect((error) => {
      if (error) {
        reject(new Error(error.message));
      } else {
        client
          .query(query, params)
          .then((response) => {
            resolve({ success: 'SendQuery Success', data: response.rows });
          })
          .catch((error) => reject(error.message));
      }
    });
  });
}

module.exports = { sendQuery, checkConfig };
