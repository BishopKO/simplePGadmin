import React, { Component } from 'react';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import { connect } from 'react-redux';
import { authenticateAction } from 'actions';

const StyledWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const StyledForm = styled.form`
  width: 100%;
  padding: 10px;
  overflow: hidden;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 35px;
  margin-top: 10px;
  background: ${({ theme }) => theme.first};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
`;

class LoginForm extends Component {
  handleCheckLogin = () => {
    const { config, authUser } = this.props;

    document.querySelectorAll('.LoginForm Input').forEach((item) => {
      config[item.name] = item.value;
    });
    authUser(config);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loginCount < this.props.loginCount) {
      alert('Login Fail!');
    } else {
    }
  }

  render() {
    return (
      <StyledWrapper>
        <StyledForm className="LoginForm">
          <Input label="Username" name="user" value="bishop" />
          <Input label="Password" name="password" type="password" value="ghost14" />
          <Input label="Host" name="host" value="127.0.0.1" />
          <StyledButton type="button" onClick={this.handleCheckLogin}>
            {this.props.loggedIn ? 'Disconnect' : 'Connect'}
          </StyledButton>
        </StyledForm>
      </StyledWrapper>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  authUser: (config) => dispatch(authenticateAction(config)),
});

const mapStateToProps = (state) => {
  const { config, loginCount, loggedIn } = state;
  return { config, loginCount, loggedIn };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
