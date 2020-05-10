import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import mainTheme from 'themes/mainTheme';
import GlobalStyle from 'themes/GlobalStyle';

const StyledWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MainTemplate = ({ children }) => (
  <StyledWrapper>
    <GlobalStyle />
    <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>
  </StyledWrapper>
);

export default MainTemplate;
