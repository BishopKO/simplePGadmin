import React, { useState } from 'react';
import styled from 'styled-components';
import Input from 'components/molecules/Input/Input';
import { connect } from 'react-redux';
import { authenticate, saveUserAction, removeUserAction } from 'actions';

const StyledWrapper = styled.div`
  width: 200px;
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

const LoginForm = ({ saveUser, removeUser }) => {
  const [loggedin, setLoggedin] = useState(false);

  const handleCheckLogin = () => {
    const config = {};
    document.querySelectorAll('.LoginForm Input').forEach((item) => {
      config[item.name] = item.value;
    });

    if (loggedin) {
      setLoggedin(false);
      removeUser();
    } else {
      authenticate(config).then((resp) => {
        if ('error' in resp) {
          alert('Login error');
        } else {
          saveUser(config);
          setLoggedin(true);
        }
      });
    }
  };

  return (
    <StyledWrapper>
      <StyledForm className="LoginForm">
        <Input label="Username" name="user" />
        <Input label="Password" name="password" type="password" />
        <Input label="Host" name="host" />
        <Input label="Database" name="database" />
        <StyledButton type="button" onClick={handleCheckLogin}>
          {loggedin ? 'Disconnect' : 'Connect'}
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
const mapDispatchToProps = (dispatch) => ({
  saveUser: (config) => dispatch(saveUserAction(config)),
  removeUser: () => dispatch(removeUserAction()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
