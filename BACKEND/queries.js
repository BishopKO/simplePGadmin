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
const genQueryCreateTable = (tableData, primaryKey) => {
  const tableName = tableData.table_name;
  delete tableData.table_name;

  let data = Object.values(tableData)
    .map(({ column_name, column_type, column_length }, index) => {
      if (column_name) {
        let column = `${column_name} ${column_type}`;
        if (parseInt(column_length) > 0) {
          column += `(${column_length})`;
        }
        if (index === primaryKey) {
          column += ' PRIMARY KEY ';
        }
        return column;
      }
    })
    .toString();
  console.log(data);
  return `CREATE TABLE ${tableName} (${data})`;
};

const genQueryRenameTable = (currentTbl, newTableName) => {
  return `ALTER TABLE ${currentTbl} RENAME TO ${newTableName}`;
};

const genQueryDropTable = (tableName) => {
  return `DROP TABLE ${tableName}`;
};

const genQueryInsertTable = (tableName, columnData) => {
  console.log(columnData);
  let columns = Object.keys(columnData);

  let values = Object.values(columnData).map((val) => `'${val}'`);
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
};

const genQueryGetTableSchema = (tableName) => {
  return `SELECT column_name, data_type, character_maximum_length, column_default FROM information_schema.columns where table_name='${tableName}' and table_schema='public'`;
};

const genQuerySelectAllTable = (tableName) => {
  return `SELECT * from ${tableName}`;
};

const genQuerySelectWhere = (tableName, searchColumn, searchValue) => {
  console.log(searchValue);
  if (searchValue.indexOf('%') === -1) {
    return `SELECT * FROM ${tableName} WHERE ${searchColumn}='${searchValue}'`;
  } else {
    return `SELECT * FROM ${tableName} WHERE ${searchColumn} LIKE '${searchValue}'`;
  }
};

const genQueryUpdateRow = (tableName, oldRowData, newRowData) => {
  const newValues = Object.entries(newRowData).map(([name, value]) => `${name}='${value}'`);
  const whereValues = Object.entries(oldRowData)
    .map(([name, value]) => `${name}='${value}'`)
    .join(' AND ');

  return `UPDATE ${tableName} set ${newValues} where ${whereValues}`;
};

module.exports = {
  genQueryGetDatabases,
  genQueryGetTables,
  genQueryCreateDatabase,
  genQueryRenameDatabase,
  genQueryDropDatabase,
  genQueryCreateTable,
  genQueryRenameTable,
  genQueryDropTable,
  genQueryGetTableSchema,
  genQueryInsertTable,
  genQuerySelectAllTable,
  genQuerySelectWhere,
  genQueryUpdateRow,
};
