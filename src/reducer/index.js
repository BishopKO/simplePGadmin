const initState = {
  config: { user: '', password: '', host: '', database: 'postgres', currentDb: '' },
  loggedIn: false,
  loginCount: 0,
  databases: [],
  tables: [],
  errors: [],
  createTable: { primaryKeyColumn: -1 },
};

const myReducer = (state = initState, action) => {
  console.log('REDUCER: ', action, 'STATE: ', state.config);
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        config: action.payload.config,
        loggedIn: true,
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
        errors: state.errors.concat(['Get tables error']),
      };
    case 'CREATE_DATABASE_SUCCESS':
      return {
        ...state,
      };
    case 'CREATE_DATABASE_ERROR':
      return {
        ...state,
        error: state.errors.concat(['Create database error']),
      };
    case 'RENAME_DATABASE_SUCCESS':
      return {
        ...state,
      };
    case 'RENAME_DATABASE_ERROR':
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
    case 'SET_PRIMARY_KEY':
      const newPrimaryKey = { primaryKeyColumn: action.payload };
      return {
        ...state,
        createTable: newPrimaryKey,
      };

    default:
      return state;
  }
};

export default myReducer;
