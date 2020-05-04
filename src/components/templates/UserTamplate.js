import React from 'react';
import styled from 'styled-components';
import SidePanel from 'components/organisms/SidePanel/SidePanel';
import MainViewTemplate from './MainViewTemplate';

const StyledWrapper = styled.div`
  display: grid;
  width: 800px;
  height: 400px;
  grid-template-columns: 200px 1fr;
  grid-gap: 0;
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
`;

const UserTemplate = ({ children }) => {
  return (
    <StyledWrapper>
      <SidePanel />
      <MainViewTemplate>{children}</MainViewTemplate>
    </StyledWrapper>
  );
};

export default UserTemplate;
