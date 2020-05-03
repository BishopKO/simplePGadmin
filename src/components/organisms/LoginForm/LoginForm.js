import React from 'react';
import styled from 'styled-components';
import Input from 'components/molecules/Input/Input';
import { authenticate } from 'actions';

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
  height: 30px;
  margin-top: 10px;
  background: ${({ theme }) => theme.fifth};
  border: none;
  border-radius: 2px;
  color: white;
  font-size: 1.5rem;
`;

const LoginForm = () => {
  const handleLogin = () => {
    const config = {};
    document.querySelectorAll('.LoginForm Input').forEach((item) => {
      config[item.name] = item.value;
    });

    authenticate(config).then((resp) => {
      if (resp[0].usename === config.user) {
        document.cookie = Object.values(config);
      } else {
        console.log(resp);
      }
    });
  };

  return (
    <StyledWrapper>
      <StyledForm className="LoginForm">
        <Input label="Username" name="user" />
        <Input label="Password" name="password" type="password" />
        <Input label="Host" name="host" />
        <Input label="Database" name="database" />
        <StyledButton type="button" onClick={handleLogin}>
          Connect
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

export default LoginForm;
