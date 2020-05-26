import React from 'react';

const sqlParams = {
  grants: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
  types: [
    'SERIAL',
    'INTEGER',
    'DECIMAL',
    'NUMERIC',
    'MONEY',
    'VARCHAR',
    'CHAR',
    'TEXT',
    'TIME',
    'DATE',
    'TIMESTAMP',
    'BOOL',
  ],
};

export const PageContext = React.createContext(sqlParams);
export default PageContext;
