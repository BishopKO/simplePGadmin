// DATABASES
const genQueryGetDatabases = () => {
  return 'SELECT datname FROM pg_database';
};

const genQueryGetTables = (databaseName) => {
  return `SELECT table_name FROM information_schema.tables WHERE table_catalog='${databaseName}' AND table_schema='public'`;
};

const genQueryCreateDatabase = (databaseName) => {
  return `CREATE DATABASE ${databaseName}`;
};

const genQueryRenameDatabase = (databaseNameOld, databaseNameNew) => {
  return `ALTER DATABASE ${databaseNameOld} RENAME TO ${databaseNameNew}`;
};

const genQueryDropDatabase = (databaseName) => {
  return `DROP DATABASE ${databaseName}`;
};

// TABLES
const genQueryCreateTable = (columns, primaryKey) => {
  const cols = JSON.parse(columns)
    .slice(0, -1)
    .map((item, index) => {
      let { column_name, column_type, column_length } = item;
      let column = '';
      column += `${column_name}  ${column_type} `;
      if (column_length > 0) {
        column += `(${column_length}) `;
      }
      if (primaryKey === index) {
        column += 'PRIMARY KEY';
      }
      return column;
    })
    .join(', ');

  const tableName = JSON.parse(columns).slice(-1)[0].table_name;
  console.log(cols);

  return `CREATE TABLE ${tableName} (${cols})`;
};

const genQueryDropTable = (tableName) => {
  return `DROP TABLE ${tableName}`;
};

const genQueryInsertTable = (table, columnsData) => {
  let columns = columnsData.map((item) => Object.keys(item)).toString();
  let values = columnsData.map((item) => Object.values(item)).map((val) => `'${val}'`);

  return `INSERT INTO ${table} (${columns}) VALUES (${values})`;
};

const genQueryGetColumns = (tableName) => {
  return `SELECT column_name, data_type, character_maximum_length, column_default FROM information_schema.columns where table_name='${tableName}' and table_schema='public'`;
};

const genQuerySelectAllTable = (tableName) => {
  return `SELECT * from ${tableName}`;
};

module.exports = {
  genQueryGetDatabases,
  genQueryGetTables,
  genQueryCreateDatabase,
  genQueryRenameDatabase,
  genQueryDropDatabase,
  genQueryCreateTable,
  genQueryDropTable,
  genQueryGetColumns,
  genQueryInsertTable,
  genQuerySelectAllTable,
};
