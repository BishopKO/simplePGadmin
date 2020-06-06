import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';

const StyledInput = styled.input`
  font-size: 1rem;
  width: calc(100% - 4px); 
  border: none;  
  background: hsl(200, 20%, 96%);
  height: ${({ height }) => height || '65%'};
  background: ${({ bgColor }) => bgColor};
  margin: ${({ margin }) => margin || ''}};
  
  ${({ centerText }) =>
    centerText &&
    css`
      text-align: center;
    `}  
  
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
  centerText,
  placeholder,
  className,
}) => {
  const valuesToSession = (colNumber, name, value) => {
    let currentSession = JSON.parse(sessionStorage.getItem('columns'));
    if (!currentSession[colNumber]) {
      currentSession[colNumber] = {};
    }
    currentSession[colNumber] = Object.assign(currentSession[colNumber], {
      [name]: value,
    });
    sessionStorage.setItem('columns', JSON.stringify(currentSession));
  };

  return (
    <BorderWithLabel label={label} width={width} height={height} disabled={disabled}>
      <StyledInput
        className={className}
        placeholder={placeholder}
        centerText={centerText}
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
