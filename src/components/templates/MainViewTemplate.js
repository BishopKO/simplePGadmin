import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TopMenu from 'components/organisms/TopMenu/TopMenu';
import UserTemplate from './UserTamplate';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
`;

const MainViewTemplate = ({ children }) => {
  return (
    <StyledWrapper>
      <TopMenu />
      {children}
    </StyledWrapper>
  );
};

export default MainViewTemplate;
