import axios from 'axios';

// DATABASES
export const authenticateAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/login', {
      config,
    })
    .then((payload) => {
      if ('error' in payload.data) {
        dispatch({ type: 'AUTH_USER_FAIL' });
      } else {
        dispatch({ type: 'AUTH_USER_SUCCESS', payload: { config: config } });
      }
    })
    .catch(() => dispatch({ type: 'AUTH_USER_ERROR', payload: 'error' }));
};

export const getDatabasesAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/databases', {
      config,
    })
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        dispatch({ type: 'GET_DATABASES_SUCCESS', payload: response.data });
      }
    })
    .catch((error) => dispatch({ type: 'GET_DATABASES_ERROR', payload: error.message }));
};

export const createDatabaseAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/create_database', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'CREATE_DATABASE_SUCCESS', payload: config.databaseName });
      }
    })
    .catch((error) => dispatch({ type: 'CREATE_DATABASE_ERROR', payload: error.message }));
};

export const dropDatabaseAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/drop_database', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw Error(resp.data.error);
      } else {
        dispatch({ type: 'DROP_DATABASE_SUCCESS' });
      }
    })
    .catch((error) => dispatch({ type: 'DROP_DATABASE_ERROR', payload: error }));
};

export const renameDatabaseAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/rename_database', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw Error(resp.data.error);
      } else {
        dispatch({ type: 'RENAME_DATABASE_SUCCESS' });
      }
    })
    .catch((error) => dispatch({ type: 'RENAME_DATABASE_ERROR', payload: error.message }));
};

// TABLES
export const getTablesAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/tables', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'GET_TABLES_SUCCESS', payload: resp.data });
      }
    })
    .catch((error) => dispatch({ type: 'GET_TABLES_ERROR', payload: error.message }));
};

export const createTableAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/create_table', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'CREATE_TABLE_SUCCESS' });
      }
    })
    .catch((error) => dispatch({ type: 'CREATE_TABLE_ERROR', payload: error.message }));
};

export const renameTableAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/rename_table', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw Error(resp.data.error);
      } else {
        dispatch({ type: 'RENAME_TABLE_SUCCESS' });
      }
    })
    .catch((error) => dispatch({ type: 'RENAME_TABLE_ERROR', payload: error.message }));
};

export const insertTableAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/insert_table', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'INSERT_TABLE_SUCCESS' });
      }
    })
    .catch((error) => dispatch({ type: 'INSERT_TABLE_ERROR', payload: error.message }));
};

export const updateRowAction = (config) => (dispatch) => {
  dispatch({ type: 'LOADING_DATA' });
  return axios
    .post('http://127.0.0.1:800/update_row', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'UPDATE_ROW_SUCCESS' });
      }
    })
    .catch((error) => dispatch({ type: 'UPDATE_ROW_ERROR', payload: error.message }));
};

export const dropTableAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/drop_table', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'DROP_TABLE_SUCCESS' });
      }
    })
    .catch((error) => dispatch({ type: 'DROP_TABLE_ERROR', payload: error.message }));
};

export const getTableAllDataAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/select_tableAll', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'SELECT_ALL_SUCCESS', payload: resp });
      }
    })
    .catch((error) => dispatch({ type: 'SELECT_ALL_ERROR', payload: error.message }));
};

export const getTableWhereDataAction = (config) => (dispatch) => {
  dispatch({ type: 'LOADING_DATA' });
  return axios
    .post('http://127.0.0.1:800/select_tableWhere', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'GET_ROWS_WHERE_SUCCESS', payload: resp });
      }
    })
    .catch((error) => dispatch({ type: 'GET_ROWS_WHERE_ERROR', payload: error.message }));
};

export const getTableSchemaAction = (config) => (dispatch) => {
  dispatch({ type: 'LOADING_DATA' });
  return axios
    .post('http://127.0.0.1:800/get_table_schema', {
      config,
    })
    .then((resp) => {
      if (resp.data.error) {
        throw new Error(resp.data.error);
      } else {
        dispatch({ type: 'GET_TABLE_SCHEMA_SUCCESS', payload: resp.data });
      }
    })
    .catch((error) => dispatch({ type: 'GET_TABLE_SCHEMA_ERROR', payload: error.message }));
};
