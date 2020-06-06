import React, { Component } from 'react';
import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateAction } from 'actions';
import {
  StyledWrapper,
  StyledButton,
  StyledForm,
  StyledFormInputsWrapper,
} from './loginFormStyles';

class LoginForm extends Component {
  handleCheckLogin = () => {
    const { config, authUser } = this.props;

    document.querySelectorAll('.LoginForm InputWithBorder').forEach((item) => {
      config[item.name] = item.value;
    });
    authUser(config);
    console.log(config);
  };

  componentDidMount() {
    const { authUser } = this.props;
    const config = { user: 'bishop', password: 'ghost14', database: 'postgres', host: '127.0.0.1' };
    authUser(config);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loginCount } = this.props;
    console.log(loginCount);
    if (prevProps.loginCount < loginCount) {
      alert('Login Fail!');
    } else {
      console.log(this.props.config);
    }
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <StyledWrapper>
        <StyledForm className="LoginForm">
          <StyledFormInputsWrapper>
            <InputWithBorder
              label="Username"
              name="user"
              type="text"
              width="100%"
              height="2.5rem"
              activeUpdate={false}
            />
            <InputWithBorder
              label="Password"
              name="password"
              type="password"
              width="100%"
              height="2.5rem"
              activeUpdate={false}
            />
            <InputWithBorder
              label="Host"
              name="host"
              type="text"
              width="100%"
              height="2.5rem"
              activeUpdate={false}
            />
          </StyledFormInputsWrapper>
          <StyledButton type="button" onClick={this.handleCheckLogin}>
            {loggedIn ? 'Disconnect' : 'Connect'}
          </StyledButton>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

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
