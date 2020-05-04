export const saveUserAction = (config) => {
  return {
    type: 'SAVE_USER',
    payload: { config },
  };
};

export const removeUserAction = () => {
  return {
    type: 'REMOVE_USER',
  };
};

export const authenticate = (config) => {
  return new Promise((resolve) => {
    fetch('http://127.0.0.1:800/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .then((response) => response.json())
      .then((resp) => resolve(resp))
      .catch((error) => resolve(error));
  });
};

export const getDatabases = (config) => (dispatch) => {
  fetch('http://127.0.0.1:800/databases', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  })
    .then((response) => response.json())
    .then((resp) => dispatch({ type: 'DATABASES', payload: [1, 2, 3] }))
    .catch((error) => dispatch({ type: 'ERROR' }));
};
