import React, { useEffect, useReducer } from 'react';
import store from 'store';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateAction, getDatabasesAction } from 'actions';
import {
  StyledWrapper,
  StyledButton,
  StyledForm,
  StyledFormInputsWrapper,
  StyledBorderWithLabel,
  StyledPortSSLWrapper,
  StyledFormInput,
} from './loginFormStyles';

const LoginForm = ({ loggedIn, errors, authUser, getDatabasesList, databases, config }) => {
  const formReducer = (state, { name, value }) => {
    return {
      ...state,
      [name]: value,
    };
  };

  const initState = {
    user: '',
    password: '',
    database: 'postgres',
    host: '127.0.0.1',
    port: '5432',
    ssl: false,
    errors: [],
    loginCount: 0,
  };

  const [state, dispatch] = useReducer(formReducer, initState);

  useEffect(() => {
    if (loggedIn) {
      getDatabasesList(config);
    }
  }, [loggedIn]);

  const handleConnect = () => {
    let config = {};
    config.user = state.user;
    config.password = state.password;
    config.database = state.database;
    config.host = state.host;
    config.port = state.port;

    if (Object.values(config).every((item) => item.length > 0)) {
      config.ssl = state.ssl;
      authUser(config);
    } else {
      dispatch({ name: 'loginCount', value: state.loginCount + 1 });
    }
  };

  const handleSetLoginData = (element) => {
    const { name, value } = element.target;
    if (name === 'ssl') {
      dispatch({ name: 'ssl', value: +!state.ssl });
    } else {
      dispatch({ name: name, value: value });
    }
  };

  const isError = (name) => {
    if (state.loginCount > 0) {
      if (state[name].length === 0) {
        return 'red';
      } else {
        return 'black';
      }
    }
  };

  const handleDisconnect = () => {
    store.dispatch({ type: 'DISCONNECT' });
  };

  return (
    <StyledWrapper>
      <StyledForm className="LoginForm">
        <StyledFormInputsWrapper>
          <StyledBorderWithLabel label="username" width="100%" color={isError('user')}>
            <StyledFormInput name="user" onChange={(element) => handleSetLoginData(element)} />
          </StyledBorderWithLabel>

          <StyledBorderWithLabel label="password" width="100%" color={isError('password')}>
            <StyledFormInput
              name="password"
              type="password"
              onChange={(element) => handleSetLoginData(element)}
            />
          </StyledBorderWithLabel>

          <StyledBorderWithLabel label="database" width="100%" color={isError('database')}>
            <StyledFormInput
              name="database"
              defaultValue={state.database}
              onChange={(element) => handleSetLoginData(element)}
            />
          </StyledBorderWithLabel>

          <StyledBorderWithLabel label="host" width="100%" color={isError('host')}>
            <StyledFormInput name="host" onChange={(element) => handleSetLoginData(element)} />
          </StyledBorderWithLabel>

          <StyledPortSSLWrapper>
            <StyledBorderWithLabel label="port" width="100px" color={isError('port')}>
              <StyledFormInput
                name="port"
                defaultValue={state.port}
                onChange={(element) => handleSetLoginData(element)}
              />
            </StyledBorderWithLabel>

            <StyledBorderWithLabel label="ssl" width="20px">
              <StyledFormInput
                name="ssl"
                type="checkbox"
                onChange={(element) => handleSetLoginData(element)}
              />
            </StyledBorderWithLabel>
          </StyledPortSSLWrapper>
        </StyledFormInputsWrapper>
        <StyledButton type="button" onClick={loggedIn ? handleDisconnect : handleConnect}>
          {loggedIn ? 'Disconnect' : 'Connect'}
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

LoginForm.propTypes = {
  config: PropTypes.object.isRequired,
  authUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loginCount: PropTypes.number.isRequired,
};

LoginForm.defaultProps = {
  loggedIn: false,
  loginCount: 0,
};

const mapDispatchToProps = (dispatch) => ({
  authUser: (config) => dispatch(authenticateAction(config)),
  getDatabasesList: (config) => dispatch(getDatabasesAction(config)),
});

const mapStateToProps = (state) => {
  const { config, loggedIn, errors, databases } = state;
  return { config, loggedIn, errors, databases };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
