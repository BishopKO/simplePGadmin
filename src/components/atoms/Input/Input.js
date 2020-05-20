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
    border-radius: 2px;
    border:1px solid white;
    font-size: 0.8rem;
    height: 10px;
    padding: 0 2px 0 2px;
    top: -5px;
    left: 5px;
  }
`;

const StyledInput = styled.input`
  border: ${({ theme }) => `1px solid ${theme.fifth}`};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  padding: 2px;
  font-size: 1.2rem;
`;

const Input = ({ label, type, name, value }) => {
  return (
    <StyledWrapper label={label}>
      <StyledInput type={type ? type : 'text'} name={name} value={value} />
    </StyledWrapper>
  );
};

export default Input;
