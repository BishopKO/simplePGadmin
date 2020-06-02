import React from 'react';

const sqlParams = {
  grants: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
};

export const PageContext = React.createContext(sqlParams);
export default PageContext;
