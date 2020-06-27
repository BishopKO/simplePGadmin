const initState = {
  config: { user: '', password: '', host: '', database: 'postgres', currentDb: '', currentTbl: '' },
  loggedIn: false,
  databases: [],
  tables: [],
  columnsData: [],
  columnsNames: [],
  errors: [],
  loading: false,

  tableSchema: {},
};

const myReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOADING_DATA':
      return {
        ...state,
        loading: false,
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
        errors: state.errors.concat(['Login failed']),
      };

    case 'DISCONNECT':
      return {
        ...state,
        databases: [],
        tables: [],
        config: {
          user: '',
          password: '',
          host: '',
          database: 'postgres',
          currentDb: '',
          currentTbl: '',
        },
        loggedIn: false,
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
    case 'CREATE_DATABASE_SUCCESS':
      return {
        ...state,
      };
    case 'CREATE_DATABASE_ERROR':
      return {
        ...state,
        error: state.errors.concat(['Create database error']),
      };

    // ### TABLES ###
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
    case 'CREATE_TABLE_SUCCESS':
      return {
        ...state,
        update: true,
        insertData: {},
        createData: {},
        tableSchema: {},
      };
    case 'CREATE_TABLE_ERROR':
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
      };
    case 'GET_TABLE_SCHEMA_SUCCESS':
      return {
        ...state,
        tableSchema: action.payload.data,
      };
    case 'GET_TABLE_SCHEMA_ERROR':
      return {
        ...state,
        errors: state.errors.concat(['Get table schema error.']),
      };
    case 'DROP_TABLE_SUCCESS':
      return {
        ...state,
        update: true,
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
    case 'GET_ROWS_WHERE_SUCCESS':
      return {
        ...state,
        loading: false,
        columnsNames: Object.keys(action.payload.data.data[0]),
        columnsData: action.payload.data.data.map((item) => Object.values(item)),
      };
    case 'GET_ROWS_WHERE_ERROR':
      return {
        ...state,
        loading: false,
        errors: state.errors.concat([action.payload.error]),
      };
    case 'UPDATE_ROW_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'UPDATE_ROW_ERROR':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default myReducer;
