const initState = {
  config: { user: '', password: '', host: '', database: 'login_db' },
  loggedIn: false,
  loginCount: 0,
  databases: [],
  tables: [],

  grants: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
  errors: [],
};

const myReducer = (state = initState, action) => {
  console.log('REDUCER: ', action);
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        config: action.payload.config,
        loggedIn: true,
        loginCount: 0,
      };
    case 'AUTH_USER_FAIL':
      return {
        ...state,
        loginCount: state.loginCount + 1,
        error: 'Login failed',
      };
    case 'GET_DATABASES_SUCCESS':
      return {
        ...state,
        databases: action.payload,
      };
    case 'GET_DATABASES_ERROR':
      return {
        ...state,
      };
    case 'GET_TABLES_SUCCESS':
      return {
        ...state,
        tables: action.payload,
      };
    case 'GET_TABLES_ERROR':
      return {
        ...state,
        errors: action.payload,
      };
    case 'CREATE_DATABASE_SUCCESS':
      return {
        ...state,
        databases: state.databases.concat(action.payload.toLocaleLowerCase()),
      };
    case 'CREATE_DATABASE_ERROR':
      return {
        ...state,
        error: state.errors.concat('Create database error'),
      };
    case 'DROP_DATABASE_SUCCESS':
      return {
        ...state,
        databases: state.databases.filter((item) => item !== action.payload),
      };
    case 'DROP_DATABASE_ERROR':
      return {
        ...state,
        error: state.errors.concat([action.payload]),
      };

    default:
      return state;
  }
};

export default myReducer;
