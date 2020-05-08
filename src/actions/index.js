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

export const getDatabasesAction = (config) => {
  return new Promise((resolve) => {
    axios
      .post('http://127.0.0.1:800/databases', {
        config,
      })
      .then((payload) => resolve(payload.data))
      .catch(() => resolve({ error: 'GET_DATABASES' }));
  });
};
