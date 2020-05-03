export const authenticate = (config) => {
  fetch('http://127.0.0.1:800/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  })
    .then((response) => response.json())
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
};
