import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 30px;
  padding: 4px;
  display: flex;
  flex-direction: column;

  ::before {
    position: absolute;
    content: "${({ label }) => label}";
    background: white;
    font-size: 0.8rem;
    height: 5px;
    padding: 0 2px 0 2px;
    top: 0;
    left: 10px;
  }
`;

const StyledInput = styled.input`
  border: 1px solid grey;
  width: 100%;
  height: 100%;
  padding: 2px;
  font-size: 1.2rem;
`;

const Input = ({ label }) => {
  useEffect(() => console.log(label));
  return (
    <StyledWrapper label={label}>
      <StyledInput />
    </StyledWrapper>
  );
};

export default Input;
