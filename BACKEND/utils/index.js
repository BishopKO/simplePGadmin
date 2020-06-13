const mapTypes = {
  integer: 'INT',
  numeric: 'INT',
  'character varying': 'VARCHAR',
  character: 'CHAR',
  money: 'MONEY',
  text: 'TEXT',
  'time without time zone': 'TIME',
  date: 'DATE',
  'timestamp without time zone': 'TIMESTAMP',
  boolean: 'BOOL',
};

const formatQueryDataInsert = (tableName, data) => {
  let tableSchema = {};
  console.log(data);

  data.map((item, index) => {
    const { column_name, data_type, character_maximum_length, column_default } = item;
    let tmpData = {};
    tmpData.column_name = column_name;
    tmpData.column_type = mapTypes[data_type];
    tmpData.column_length = character_maximum_length;
    if (column_default) {
      tmpData.column_type = 'SERIAL';
    }
    return Object.assign(tableSchema, { [index]: tmpData });
  });
  tableSchema.table_name = tableName;

  return tableSchema;
};

module.exports = {
  formatQueryDataInsert,
};
