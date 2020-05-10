import axios from 'axios';

export const authenticateAction = (config, configDatabase) => (dispatch) => {
  return axios
    .post('http://127.0.0.1:800/login', {
      configDatabase,
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

export const getDatabasesAction = (config) => {
  return new Promise((resolve) => {
    axios
      .post('http://127.0.0.1:800/databases', {
        config,
      })
      .then((databases) => resolve(databases))
      .catch(() => resolve({ error: 'GET_DATABASES_ERROR' }));
  });
};

export const getTablesAction = (config, database) => {
  return new Promise((resolve) => {
    axios
      .post('http://127.0.0.1:800/tables', {
        config,
        database,
      })
      .then((tables) => resolve(tables))
      .catch(() => resolve({ error: 'GET_DATABASES_ERROR' }));
  });
};
