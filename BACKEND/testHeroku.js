const { Client } = require('pg');

const config = {
  host: 'ec2-54-75-246-118.eu-west-1.compute.amazonaws.com',
  database: 'd8k9t9jmjs5bsi',
  user: 'gihjzbklnwbppu',
  password: 'a41b1f07ff3f87a08fbdef10963a945403de657314194eedca0e399773f10349',
  ssl: {
    rejectUnauthorized: false,
  },
};

const client = new Client(config);

client.connect((err) => console.log(err));
client.query('select now()').then((resp) => console.log(resp.rows));
