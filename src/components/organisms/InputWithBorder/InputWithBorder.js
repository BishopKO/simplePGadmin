import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';

const StyledInput = styled.input`
  font-size: 1.2rem;
  background: ${({ bgColor }) => bgColor};
  width: calc(100% - 4px);
  height: ${({ height }) => height || '65%'};
  border: none;
  background: hsl(200, 20%, 96%);
  margin: ${({ margin }) => margin || ''}};  
`;

const InputWithBorder = ({
  label,
  type,
  value,
  name,
  height,
  width,
  disabled,
  setPrimaryKey,
  checked,
  colNumber,
  activeUpdate,
}) => {
  const valuesToSession = (colNumber, name, value) => {
    let currentSession = sessionStorage.getItem('columns') || JSON.stringify({});
    try {
      let session = JSON.parse(currentSession);
      session[colNumber] = { name: name, value: value };
      sessionStorage.setItem('columns', JSON.stringify(session));
      console.log(sessionStorage.getItem('columns'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BorderWithLabel label={label} width={width} height={height} disabled={disabled}>
      <StyledInput
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        onClick={setPrimaryKey}
        onChange={
          activeUpdate ? (element) => valuesToSession(colNumber, name, element.target.value) : null
        }
        checked={checked}
      />
    </BorderWithLabel>
  );
};

InputWithBorder.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

InputWithBorder.defaultProps = {
  label: 'Default label',
  type: 'text',
  name: 'Default name',
};

export default InputWithBorder;
