import React from 'react';

export const grants = { grants: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'] };
export const PageContext = React.createContext({ grants: grants });
