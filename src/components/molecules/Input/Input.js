import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 10px;  
  display: flex;
  flex-direction: column;

  ::before {
    position: absolute;
    content: "${({ label }) => label}";
    background: white;
    font-size: 1rem;
    height: 6px;
    padding: 0 2px 0 2px;
    top: -5px;
    left: 5px;
  }
`;

const StyledInput = styled.input`
  border: ${({ theme }) => `1px solid ${theme.fifth}`};
  border-radius: 2px;
  width: 100%;
  height: 100%;
  padding: 2px;
  font-size: 1.4rem;
`;

const Input = ({ label, type, name }) => {
  return (
    <StyledWrapper label={label}>
      <StyledInput type={type ? type : 'text'} name={name} />
    </StyledWrapper>
  );
};

export default Input;
