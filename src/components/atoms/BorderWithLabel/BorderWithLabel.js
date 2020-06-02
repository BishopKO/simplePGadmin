import styled, { css } from 'styled-components';

const BorderWithLabel = styled.div`
  position: relative;
  width: ${({ width }) => width || '200px'};
  height: ${({ height }) => height || '2rem'};    
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // border: ${({ theme }) => `1px solid ${theme.border}`};
  border: 1px solid lightgrey;
  border-radius: 3px;

  ::after {
    position: absolute;
    content: "${({ label }) => label}";
    background: white;
    font-size: 0.8rem;
    height: 0.8rem;
    padding: 0 2px 0 2px;
    top: -0.6rem;
    left: 1px;
  }  
  
   ${({ disabled }) =>
     disabled &&
     css`
       pointer-events: none;
       color: grey;
     `};
`;

export default BorderWithLabel;
