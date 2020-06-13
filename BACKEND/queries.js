// DATABASES
const genQueryGetDatabases = () => {
  return "SELECT datname FROM pg_database";
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
      let column = "";
      column += `${column_name}  ${column_type} `;
      if (column_length > 0) {
        column += `(${column_length}) `;
      }
      if (primaryKey === index) {
        column += "PRIMARY KEY";
      }
      return column;
    })
    .join(", ");

  const tableName = JSON.parse(columns).slice(-1)[0].table_name;
  console.log(cols);

  return `CREATE TABLE ${tableName} (${cols})`;
};

const genQueryDropTable = (tableName) => {
  return `DROP TABLE ${tableName}`;
};

const genQueryInsertTable = (table, columnsData) => {
  console.log(table);
  let columns = Object.keys(columnsData);
  let values = Object.values(columnsData).map((val) => `'${val}'`);
  return `INSERT INTO ${table} (${columns}) VALUES (${values})`;
};

const genQueryGetColumns = (tableName) => {
  return `SELECT column_name, data_type, character_maximum_length, column_default FROM information_schema.columns where table_name='${tableName}' and table_schema='public'`;
};

const genQuerySelectAllTable = (tableName) => {
  return `SELECT * from ${tableName}`;
};

const genQuerySelectWhere = (tableName, searchColumn, searchValue) => {
  console.log(searchValue);
  if (searchValue.indexOf("%") === -1) {
    return `SELECT * FROM ${tableName} WHERE ${searchColumn}='${searchValue}'`;
  } else {
    return `SELECT * FROM ${tableName} WHERE ${searchColumn} LIKE '${searchValue}'`;
  }
};

const genQueryUpdateRow = (tableName, oldRowData, newRowData) => {
  const newValues = Object.entries(newRowData).map(([name, value]) => `${name}='${value}'`);
  const whereValues = Object.entries(oldRowData).map(([name, value]) => `${name}='${value}'`).join(" AND ");

  return `UPDATE ${tableName} set ${newValues} where ${whereValues}`;

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
  genQuerySelectWhere,
  genQueryUpdateRow
};
