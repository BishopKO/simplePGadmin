import React from 'react';
import styled from 'styled-components';
import LoginForm from 'components/organisms/LoginForm/LoginForm';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SidePanel = () => (
  <StyledWrapper>
    <LoginForm />
  </StyledWrapper>
);

export default SidePanel;
