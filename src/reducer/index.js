const initState = {
  config: { user: '', password: '', host: '', database: 'postgres', currentDb: '', currentTbl: '' },
  loggedIn: false,
  loginCount: 0,
  databases: [],
  tables: [],
  columnsData: [],
  columnsNames: [],
  errors: [],
  loading: false,
};

const myReducer = (state = initState, action) => {
  console.log('REDUCER: ', action);
  switch (action.type) {
    case 'LOADING_DATA':
      return {
        ...state,
        loading: true,
      };
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
        tables: [],
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
    case 'SELECT_ALL_SUCCESS':
      return {
        ...state,
        columnsNames: Object.keys(action.payload.data.data[0]),
        columnsData: action.payload.data.data.map((item) => Object.values(item)),
      };
    case 'SELECT_ALL_ERROR':
      return {
        ...state,
        errors: state.errors.concat([action.payload.error]),
      };
    case 'GET_COLUMNS_WHERE_SUCCESS':
      return {
        ...state,
        loading: false,
        columnsNames: Object.keys(action.payload.data.data[0]),
        columnsData: action.payload.data.data.map((item) => Object.values(item)),
      };
    case 'GET_COLUMNS_WHERE_ERROR':
      return {
        ...state,
        errors: state.errors.concat([action.payload.error]),
      };

    default:
      return state;
  }
};

export default myReducer;
