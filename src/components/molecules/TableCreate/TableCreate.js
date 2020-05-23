import React from 'react';
import withContext from 'hoc/withContext';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import goIcon from 'assets/goIcon.svg';
import {
  StyledPK,
  StyledInput,
  StyledBorderName,
  StyledBorderOptions,
  StyledBorderWidth,
  StyledAddColumn,
  StyledSelect,
  StyledInputCheckbox,
  StyledGrants,
} from './tableCreateStyles';
import Modal from 'components/atoms/Modal/Modal';

const TableCreate = ({ context }) => {
  const { grants, types } = context;

  const createKey = (value, index) => {
    return `${index}_${value}`;
  };

  return (
    <Modal createTable>
      <StyledAddColumn label="Add +">
        <StyledBorderName label="name">
          <StyledInput id="tableName" />
        </StyledBorderName>
        <StyledBorderOptions label="type">
          <StyledSelect>
            {types.map((item, index) => (
              <option key={createKey(item, index)} value={item}>
                {item}
              </option>
            ))}
          </StyledSelect>
        </StyledBorderOptions>
        <StyledBorderWidth label="width">
          <StyledInput id="tableName" />
        </StyledBorderWidth>
        <StyledPK label="pk">
          <StyledInputCheckbox type="checkbox" />
        </StyledPK>
      </StyledAddColumn>

      <StyledGrants label="Grants" width={'230px'}>
        {grants.map((item, index) => (
          <label key={createKey(item, index)}>
            {item}
            <input
              key={createKey(item, index)}
              id={item.toLocaleLowerCase()}
              type="checkbox"
              value={item}
            />
          </label>
        ))}
      </StyledGrants>
    </Modal>
  );
};

export default withContext(TableCreate);
