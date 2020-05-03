const { Client } = require('pg');

function sendQuery(config, query, params = []) {
  const client = new Client(config);
  return new Promise((resolve) => {
    client.connect().catch((error) => resolve(error.stack.split('\n')[0]));

    client
      .query(query, params)
      .then((response) => {
        client.end();
        resolve(response.rows);
      })
      .catch((error) => resolve(error.stack.split('\n')[0]));
  });
}

module.exports = { sendQuery };
