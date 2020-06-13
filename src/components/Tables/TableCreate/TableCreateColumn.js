import React, { useState, useEffect, useReducer } from 'react';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import StyledInput from 'components/atoms/StyledInput/StyledInput';
import { StyledAddColumn, StyledSelect } from './tableCreateStyles';
import store from 'store';

import createKey from 'utils/genReactKey';
import columnTypes from './columnTypes';

const TableCreateColumn = ({ colNumber, isPrimaryKey, setPrimaryKey }) => {
  const [lengthDisabled, setLengthDisabled] = useState(true);

  const initState = {
    column_name: '',
    column_type: '',
    column_length: '',
  };

  const formReducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  const [state, dispatch] = useReducer(formReducer, initState);

  useEffect(() => {
    store.dispatch({ type: 'CREATE_TABLE_FORM', payload: { [colNumber]: state } });
  });

  const handleUpdateFormData = (element) => {
    const name = element.target.name;
    const value = element.target.value;

    if (name === 'column_type') {
      if (['VARCHAR', 'CHAR'].includes(value)) {
        setLengthDisabled(false);
      } else {
        setLengthDisabled(true);
        dispatch({ field: 'column_length', value: '' });
      }
    }
    dispatch({ field: name, value: value });
  };

  const { column_name, column_length } = state;
  return (
    <StyledAddColumn>
      <BorderWithLabel label="Column name">
        <StyledInput
          name="column_name"
          value={column_name}
          onChange={(element) => handleUpdateFormData(element)}
        />
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
        <StyledInput
          value={column_length}
          name="column_length"
          onChange={(element) => handleUpdateFormData(element)}
        />
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
