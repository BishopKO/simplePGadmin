import React from 'react';
import styled from 'styled-components';

const IconButton = styled.button`
  position: relative;
  display: inline;
  height: 3rem;
  width: 3rem;
  margin-left: 10px;  
  background: white;
  background-image: url(${({ icon }) => icon});
  background-size: 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border: none;

  :hover{
    transform:scale(1.1);
    ::after {
      position: absolute;
      display: inline-block;
      content: "${({ label }) => label}";
      white-space: nowrap;
      z-index: 1;      
      font-size: 1.2rem;      
      border-radius: 3px;
      background: white;
      top: -2rem;  
      left: 0;    
    }
  }
`;

export default IconButton;
