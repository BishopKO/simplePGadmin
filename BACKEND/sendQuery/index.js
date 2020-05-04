const { Client } = require('pg');

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
            resolve(response.rows);
          })
          .catch((error) => resolve(error.stack.split('\n')[0]));
      }
    });
  });
}

module.exports = { sendQuery };
