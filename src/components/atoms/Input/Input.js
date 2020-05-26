import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

//TODO: REMOVE FIXED FIELDS VALUE
const Input = ({ label, type, value, name }) => {
  return (
    <StyledWrapper label={label}>
      <StyledInput type={type} value={value} name={name} />
    </StyledWrapper>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: 'Default label',
  name: 'Default name',
};

export default Input;
