import React from 'react';
import styled from 'styled-components';
import SidePanel from 'components/organisms/SidePanel/SidePanel';

const StyledWrapper = styled.div`
  display: grid;
  width: 800px;
  height: 400px;
  grid-template-columns: 200px 1fr;
  grid-gap: 0;
  border-radius: 5px;
  overflow: hidden;
`;

const TestUserView = styled.div`
  width: 100%;
  height: 100%;
  background: lightgray;
`;

const UserTemplate = () => (
  <StyledWrapper>
    <SidePanel />
    <TestUserView />
  </StyledWrapper>
);

export default UserTemplate;
