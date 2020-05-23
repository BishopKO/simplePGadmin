import React from 'react';

const sqlParams = {
  grants: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
  types: [
    'serial',
    'integer',
    'decimal',
    'numeric',
    'money',
    'varchar',
    'char',
    'text',
    'time',
    'date',
    'timestamp',
    'bool',
  ],
};

export const PageContext = React.createContext(sqlParams);
export default PageContext;
