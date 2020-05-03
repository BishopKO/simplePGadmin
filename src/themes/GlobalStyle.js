import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
      box-sizing: border-box;
    }
    
    html{
      font-size: 62.5%;
    }

    body{
      font-size: 1.6rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;
