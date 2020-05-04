const initState = {
  user: '',
  password: '',
  host: '',
  port: '',
};

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...action.payload.config,
      };
    case 'LOGOUT':
      return initState;
    default:
      return state;
  }
};

export default myReducer;
