import React from 'react';
import styled from 'styled-components';
import TopMenu from 'components/organisms/TopMenu/TopMenu';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
`;

const MainWindowTemplate = ({ children }) => {
  return (
    <StyledWrapper>
      <TopMenu />
      {children}
    </StyledWrapper>
  );
};

export default MainWindowTemplate;
