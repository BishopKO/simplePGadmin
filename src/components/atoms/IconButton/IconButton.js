import styled from 'styled-components';

const IconButton = styled.button`
  position: relative;
  cursor: pointer;
  width: 10px;
  height: 10px;
  background: white;
  background-image: url(${({ icon }) => icon});
  background-size: 50%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border: none;
`;

export default IconButton;
