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
  update: false,

  createTableForm: {},
  insertTableForm: {},
  rowToEdit: {},
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
      };
    case 'CREATE_TABLE_ERROR':
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
      };
    case 'GET_TABLE_SCHEMA_SUCCESS':
      return {
        ...state,
        insertTableForm: action.payload.data,
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
    case 'ROW_EDIT':
      // TODO: user, password in dispatch?
      return {
        ...state,
        rowToEdit: Object.assign(state.rowToEdit, action.payload),
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
    case 'CREATE_TABLE_FORM':
      return {
        ...state,
        createTableForm: Object.assign(state.createTableForm, action.payload),
      };

    default:
      return state;
  }
};

export default myReducer;
