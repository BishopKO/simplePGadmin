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
  background: ${({ bgColor }) => bgColor};
  border: none;
  border-radius: 3px;

  :hover {
    //transform: scale(1.05);
    transition: all 0.3s;
    cursor: pointer;
  }

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
