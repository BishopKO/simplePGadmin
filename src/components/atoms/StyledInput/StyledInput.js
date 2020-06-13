import styled, { css } from 'styled-components';

const StyledInput = styled.input`
  font-size: 1rem;
  width: calc(100% - 4px); 
  border: none;  
  background: hsl(200, 20%, 96%);
  height: ${({ height }) => height || '65%'};
  background: ${({ bgColor }) => bgColor};
  margin: ${({ margin }) => margin || ''}};
  
  ${({ centerText }) =>
    centerText &&
    css`
      text-align: center;
    `} 
`;

export default StyledInput;
