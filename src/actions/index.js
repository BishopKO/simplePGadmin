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
