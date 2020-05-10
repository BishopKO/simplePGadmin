import React from 'react';
import styled from 'styled-components';

const IconButton = styled.button`
  position: relative;
  height: 20px;
  width: 20px;
  cursor: pointer;
  background-image: url(${({ icon }) => icon});
  background-size: 85%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border: none;

  :hover {
    transform: scale(0.95);
  }
`;

export default IconButton;
