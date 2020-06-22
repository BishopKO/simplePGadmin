import React, { useState, useEffect } from 'react';
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

const LoginForm = ({ config, loggedIn, errors, authUser }) => {
  const [loginForm, setLoginForm] = useState({});

  const handleConnect = () => {
    Object.entries(loginForm).forEach(([name, value]) => {
      config[name] = value;
    });
    authUser(config);
  };

  useEffect(() => {
    let error = errors.slice(-1)[0];
    console.log(errors.slice(-1));
    if (error) {
      alert(error);
    }
  }, [errors]);

  const handleSetLoginForm = (element) => {
    const { name, value } = element.target;
    setLoginForm(Object.assign(loginForm, { [name]: value }));
  };

  const handleDisconnect = () => {
    store.dispatch({ type: 'DISCONNECT' });
  };

  return (
    <StyledWrapper>
      <StyledForm className="LoginForm">
        <StyledFormInputsWrapper>
          <BorderWithLabel label="Username" width="100%">
            <StyledInput name="user" onChange={(element) => handleSetLoginForm(element)} />
          </BorderWithLabel>

          <BorderWithLabel label="password" width="100%">
            <StyledInput
              name="password"
              type="password"
              onChange={(element) => handleSetLoginForm(element)}
            />
          </BorderWithLabel>

          <BorderWithLabel label="Host" width="100%">
            <StyledInput name="host" onChange={(element) => handleSetLoginForm(element)} />
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

const mapStateToProps = (state) => {
  const { config, loggedIn, errors } = state;
  return { config, loggedIn, errors };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
