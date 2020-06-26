import React, { useState, useEffect, useReducer } from 'react';
import store from 'store';

import StyledInput from 'components/atoms/StyledInput/StyledInput';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateAction } from 'actions';
import {
  StyledWrapper,
  StyledButton,
  StyledForm,
  StyledFormInputsWrapper,
} from './loginFormStyles';

const LoginForm = ({ loggedIn, errors, authUser }) => {
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
    host: '',
    port: '5432',
    ssl: false,
    errors: [],
    loginCount: 0,
  };

  const [state, dispatch] = useReducer(formReducer, initState);

  const handleConnect = () => {
    let config = {};
    config.user = state.user;
    config.password = state.password;
    config.database = state.database;
    config.host = state.host;
    config.port = state.port;
    console.log(config);

    if (Object.values(config).every((item) => item.length > 0)) {
      console.log(1);
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

  useEffect(() => {
    let error = errors.slice(-1)[0];
    console.log(errors.slice(-1));
    if (error) {
      alert(error);
    }
  }, [errors]);

  return (
    <StyledWrapper>
      <StyledForm className="LoginForm">
        <StyledFormInputsWrapper>
          <BorderWithLabel label="username" width="100%" color={isError('user')}>
            <StyledInput name="user" onChange={(element) => handleSetLoginData(element)} />
          </BorderWithLabel>

          <BorderWithLabel label="password" width="100%" color={isError('password')}>
            <StyledInput
              name="password"
              type="password"
              onChange={(element) => handleSetLoginData(element)}
            />
          </BorderWithLabel>

          <BorderWithLabel label="database" width="100%" color={isError('database')}>
            <StyledInput
              name="database"
              defaultValue={state.database}
              onChange={(element) => handleSetLoginData(element)}
            />
          </BorderWithLabel>

          <BorderWithLabel label="host" width="100%" color={isError('host')}>
            <StyledInput name="host" onChange={(element) => handleSetLoginData(element)} />
          </BorderWithLabel>

          <BorderWithLabel label="port" width="100%" color={isError('port')}>
            <StyledInput
              name="port"
              defaultValue={state.port}
              onChange={(element) => handleSetLoginData(element)}
            />
          </BorderWithLabel>

          <BorderWithLabel label="ssl" width="20px">
            <StyledInput
              name="ssl"
              type="checkbox"
              onChange={(element) => handleSetLoginData(element)}
            />
          </BorderWithLabel>
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
});
// TODO: fix mapStateToProps
const mapStateToProps = (state) => {
  const { config, loggedIn, errors } = state;
  return { config, loggedIn, errors };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
