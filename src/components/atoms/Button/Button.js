import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  width: 100px;
  height: 100%;
  background: ${({ theme }) => theme.fourth};
  border: none;
  border-right: 1px solid black;
  border-bottom: 1px solid black;

  &.active {
    background: white;
    color: black;
    ::after {
      position: absolute;
      content: '';
      color: white;
      width: 100%;
      height: 4px;
      background: white;
      bottom: -2px;
      left: 0;
    }
  }
`;

export default Button;
