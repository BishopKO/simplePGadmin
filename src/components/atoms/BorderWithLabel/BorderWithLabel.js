import styled from 'styled-components';

const BorderWithLabel = styled.div`
  position: relative;
  width: ${({ width }) => width || '200px'};
  height: ${({ height }) => height || '30px'};    
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: ${({ theme }) => `1px solid ${theme.border}`};
  border-radius: 3px;

  ::after {
    position: absolute;
    content: "${({ label }) => label}";
    background: white;
    font-size: 0.8rem;
    height: 10px;
    padding: 0 2px 0 2px;
    top: -6px;
    left: 5px;
  }  
`;

export default BorderWithLabel;
