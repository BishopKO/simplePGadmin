const initState = {
  config: {
    user: '',
    password: '',
    host: '',
    port: '',
  },
  databases: [],
};

const myReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        ...state[action.payload.config],
      };
    case 'REMOVE_USER':
      return initState;
    default:
      return state;
  }
};

export default myReducer;
