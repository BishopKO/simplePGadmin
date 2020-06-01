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
const genQueryCreateTable = (tableName, columns) => {
  const cols = JSON.parse(columns)
    .map((item) => {
      let { nameValue, typeValue, widthValue, primaryKey } = item;
      let column = '';
      column += `${nameValue}  ${typeValue} `;
      if (widthValue > 0) {
        column += `(${widthValue}) `;
      }
      if (primaryKey) {
        column += 'PRIMARY KEY';
      }
      return column;
    })
    .join(', ');
  return `CREATE TABLE ${tableName} (${cols})`;
};

const genQueryDropTable = (tableName) => {
  return `DROP TABLE ${tableName}`;
};

module.exports = {
  genQueryGetDatabases,
  genQueryGetTables,
  genQueryCreateDatabase,
  genQueryRenameDatabase,
  genQueryDropDatabase,
  genQueryCreateTable,
  genQueryDropTable,
};
