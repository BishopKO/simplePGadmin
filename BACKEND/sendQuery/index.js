const { Client } = require('pg');

function checkConfig(config) {
  const client = new Client(config);
  return new Promise((resolve) => {
    client.connect((error) => {
      if (error) {
        client.end();
        resolve({ error: error.message });
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
        client.end();
        reject(new Error(error.message));
      } else {
        client
          .query(query, params)
          .then((response) => {
            client.end();
            resolve(response.rows);
          })
          .catch((error) => {
            console.log(error.message);
            client.end();
            reject(error.message);
          });
      }
    });
  });
}

module.exports = { sendQuery, checkConfig };
