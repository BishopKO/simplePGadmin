import React, { useState } from 'react';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import StyledInput from 'components/atoms/StyledInput/StyledInput';
import { StyledAddColumn, StyledSelect } from './tableCreateStyles';

import createKey from 'utils/genReactKey';
import columnTypes from './columnTypes';

const TableCreateColumn = ({ updateData, colNumber, isPrimaryKey, setPrimaryKey }) => {
  const [lengthDisabled, setLengthDisabled] = useState(true);
  const [columnData, setColumnData] = useState({});

  const handleUpdateFormData = (element) => {
    const name = element.target.name;
    const value = element.target.value;
    setColumnData(Object.assign(columnData, { [name]: value }));
    updateData({ [colNumber]: columnData });

    if (['VARCHAR', 'CHAR'].includes(value) && name === 'column_type') {
      setLengthDisabled(false);
    } else {
      setLengthDisabled(true);
    }
  };

  return (
    <StyledAddColumn>
      <BorderWithLabel label="Column name">
        <StyledInput name="column_name" onChange={(element) => handleUpdateFormData(element)} />
      </BorderWithLabel>

      <BorderWithLabel width="70px" label="type">
        <StyledSelect name="column_type" onChange={(element) => handleUpdateFormData(element)}>
          {columnTypes.map((item, index) => (
            <option key={createKey(item, index)} value={item}>
              {item}
            </option>
          ))}
        </StyledSelect>
      </BorderWithLabel>

      <BorderWithLabel label="Length" width="50px" disabled={lengthDisabled}>
        <StyledInput name="column_length" onChange={(element) => handleUpdateFormData(element)} />
      </BorderWithLabel>

      <BorderWithLabel label="PK" width="20px">
        <StyledInput
          type="checkbox"
          checked={isPrimaryKey}
          onClick={() => setPrimaryKey(colNumber)}
        />
      </BorderWithLabel>
    </StyledAddColumn>
  );
};

export default TableCreateColumn;
