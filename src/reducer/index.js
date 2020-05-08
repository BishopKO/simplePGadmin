const initState = {
  config: '',
  loggedIn: false,
  databases: [],
};

const myReducer = (state = initState, action) => {
  console.log('REDUCER: ', action);
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        ['config']: action.payload.config,
        ['loggedIn']: true,
      };
    case 'GET_DATABASES':
      return {
        ...state,
        ['databases']: action.payload.databases,
      };
    default:
      return state;
  }
};

export default myReducer;
