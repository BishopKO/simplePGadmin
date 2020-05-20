import axios from 'axios';

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
        dispatch({ type: 'DROP_DATABASE_SUCCESS', payload: config.databaseName });
      }
    })
    .catch((error) => dispatch({ type: 'DROP_DATABASE_ERROR', payload: error.message }));
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
        dispatch({ type: 'RENAME_DATABASE_SUCCESS', payload: config.databaseName });
      }
    })
    .catch((error) => dispatch({ type: 'RENAME_DATABASE_ERROR', payload: error.message }));
};

export const getTablesAction = (config) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/tables', {
      config,
    })
    .then((tables) => {
      if (tables.data.error) {
        throw new Error(tables.data.error);
      } else {
        dispatch({ type: 'GET_TABLES_SUCCESS', payload: tables.data });
      }
    })
    .catch((error) => dispatch({ type: 'GET_TABLES_ERROR', payload: error.message }));
};
