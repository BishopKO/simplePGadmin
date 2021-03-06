import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  color: ${({ color }) => color || 'white'};
  background: ${({ bgColor }) => bgColor};
  width: ${({ width }) => width || '100px'};
  height: ${({ height }) => height || '25px'};

  :hover {
    transform: scale(1.05);
    transition: all 0.1s;
    cursor: pointer;
  }
`;

export default Button;
