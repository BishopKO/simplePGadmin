const initState = {
  config: '',
  configDatabase: 'login_db',
  loggedIn: false,
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
    default:
      return state;
  }
};

export default myReducer;
