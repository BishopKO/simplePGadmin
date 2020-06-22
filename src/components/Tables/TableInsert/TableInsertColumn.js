import React from 'react';
import StyledInput from 'components/atoms/StyledInput/StyledInput';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import { StyledAddColumn } from './tableInsertStyles';

const InsertColumn = ({ updateData, name, type, length, colNumber }) => {
  const handleOnChange = (element) => {
    const name = element.target.name;
    const value = element.target.value;
    updateData({ [name]: value });
  };

  return (
    <StyledAddColumn>
      <BorderWithLabel label={name}>
        <StyledInput
          name={name}
          defaultValue={type === 'SERIAL' ? 'AUTO' : null}
          disabled={type === 'SERIAL'}
          onChange={(element) => handleOnChange(element)}
        />
      </BorderWithLabel>

      <BorderWithLabel label="type" width="70px">
        <StyledInput name="type" defaultValue={type} disabled centerText />
      </BorderWithLabel>

      <BorderWithLabel label="length" width="50px">
        <StyledInput name="length" defaultValue={length} disabled centerText />
      </BorderWithLabel>

      <BorderWithLabel label="PK" width="20px">
        <StyledInput name="length" defaultValue={length} type="checkbox" disabled />
      </BorderWithLabel>
    </StyledAddColumn>
  );
};

export default InsertColumn;
