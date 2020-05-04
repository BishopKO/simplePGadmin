import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
`;

const StyledMenu = styled.div`
  background: green;
`;

const MainViewTemplate = () => {
  return (
    <StyledWrapper>
      <StyledMenu />
    </StyledWrapper>
  );
};

export default MainViewTemplate;
