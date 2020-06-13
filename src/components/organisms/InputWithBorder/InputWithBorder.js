import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import store from 'store';

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
  type,
  name,
  height,
  width,
  disabled,
  setPrimaryKey,
  checked,
  defaultValue,
  colNumber,
  centerText,
  placeholder,
  className,
  withRedux,
}) => {
  const handleOnChange = (name, value) => {
    if (withRedux) {
      if (colNumber) {
        store.dispatch({
          type: 'ROW_EDIT',
          payload: { [colNumber]: { [name]: value } },
        });
      } else {
        store.dispatch({ type: 'ROW_EDIT', payload: { [name]: value } });
      }
    }
  };

  return (
    <BorderWithLabel label={name} width={width} height={height} disabled={disabled}>
      <StyledInput
        className={className}
        placeholder={placeholder}
        centerText={centerText}
        type={type}
        defaultValue={defaultValue}
        name={name}
        disabled={disabled}
        onClick={setPrimaryKey}
        checked={checked}
        onChange={(element) => handleOnChange(name, element.target.value)}
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
