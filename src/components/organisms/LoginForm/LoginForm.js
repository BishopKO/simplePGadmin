import React, { useState, useEffect } from 'react';

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

const LoginForm = ({ config, loggedIn, authUser, loginCount }) => {
  const [loginForm, setLoginForm] = useState({});

  const handleCheckLogin = () => {
    // const { config, authUser } = this.props;
    // document.querySelectorAll('.LoginForm InputWithBorder').forEach((item) => {
    //   config[item.name] = item.value;
    // });
    // authUser(config);
    console.log(loginForm);
  };

  useEffect(() => {
    if (!loggedIn) {
      const config = {
        user: 'bishop',
        password: 'ghost14',
        database: 'postgres',
        host: '127.0.0.1',
      };
      authUser(config);
    }
  });

  const handleSetLoginForm = (element) => {
    const { name, value } = element.target;
    console.log(name, value);
    setLoginForm(Object.assign(loginForm, { [name]: value }));
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
        <StyledButton type="button" onClick={() => console.log(loginForm)}>
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
  const { config, loggedIn, loginCount } = state;
  return { config, loggedIn, loginCount };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
