import styled from 'styled-components';

// TODO: FIND BETTER GOICON

const IconButton = styled.button`
  position: relative;
  cursor: pointer;
  width: 10px;
  height: 10px;
  background-image: url(${({ icon }) => icon});
  background-size: 90%;
  background-position: 50%;
  background-repeat: no-repeat;
  border: none;
  :hover {
    background-size: 100%;
    //transform: scale(1.07);
    //transition: transform 0.5s;
  }
`;

export default IconButton;
