import React, { Component } from 'react';
import Input from 'components/atoms/Input/Input';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateAction } from 'actions';
import { StyledWrapper, StyledButton, StyledForm } from './loginFormStyles';

class LoginForm extends Component {
  handleCheckLogin = () => {
    const { config, authUser } = this.props;

    document.querySelectorAll('.LoginForm Input').forEach((item) => {
      config[item.name] = item.value;
    });
    authUser(config);
    console.log(config);
  };

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
          <Input label="Username" name="user" value="bishop" />
          <Input label="Password" name="password" type="password" value="ghost14" />
          <Input label="Host" name="host" value="127.0.0.1" />
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
