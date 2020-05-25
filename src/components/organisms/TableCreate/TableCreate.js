// TODO: WHEN FINISHED SPLIT INTO SEPARATE COMPONENTS, ADD PROP-TYPES

import React, { Component, createRef } from 'react';
import withContext from 'hoc/withContext';
import addIcon from 'assets/addIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import Modal from 'components/atoms/Modal/Modal';
import {
  StyledBorderPK,
  StyledInput,
  StyledBorderName,
  StyledBorderType,
  StyledBorderWidth,
  StyledAddColumn,
  StyledSelect,
  StyledInputCheckbox,
  StyledGrants,
  StyledButtonsWrapper,
  StyledIconButton,
} from './tableCreateStyles';

class CreateColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: null,
      widthValue: 0,
      primaryKeyValue: false,
      typeValue: 'VARCHAR',
      created: false,
    };
  }

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  render() {
    const { types, value } = this.props;

    return (
      <StyledAddColumn>
        <StyledBorderName label="name">
          <StyledInput
            value={value}
            onChange={(el) => this.setState({ nameValue: el.target.value })}
          />
        </StyledBorderName>
        <StyledBorderType label="type">
          <StyledSelect>
            {types.map((item, index) => (
              <option
                key={this.createKey(item, index)}
                value={item}
                onClick={(element) => this.setState({ type: element.target.value })}
              >
                {item}
              </option>
            ))}
          </StyledSelect>
        </StyledBorderType>
        <StyledBorderWidth
          label="width"
          disabled={this.state.typeValue !== 'VARCHAR' && this.state.typeValue !== 'CHAR'}
        >
          <StyledInput />
        </StyledBorderWidth>
        <StyledBorderPK label="pk">
          <StyledInputCheckbox type="checkbox" />
        </StyledBorderPK>
      </StyledAddColumn>
    );
  }
}

const SetGrants = ({ grants }) => {
  const createKey = (value, index) => {
    return `${index}_${value}`;
  };

  return (
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
  );
};

class TableCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 0,
    };
    this.handleCreateNewColumn = this.handleCreateNewColumn.bind(this);
    this.handleRemoveColumns = this.handleRemoveColumns.bind(this);
    this.columnsRef = Array(this.state.columns.length).fill(createRef());
  }

  handleCreateNewColumn() {
    this.setState({ columns: this.state.columns + 1 });
  }

  handleRemoveColumns() {
    this.setState({ columns: 0 });
  }

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  render() {
    const { grants, types } = this.props.context;
    return (
      <Modal createTable>
        <SetGrants grants={grants} />
        <StyledButtonsWrapper>
          <StyledIconButton icon={addIcon} onClick={this.handleCreateNewColumn} />
          <StyledIconButton icon={trashIcon} onClick={this.handleRemoveColumns} />
        </StyledButtonsWrapper>

        {Array(this.state.columns)
          .fill(null)
          .map((item, index) => (
            <CreateColumns
              key={this.createKey('column', index)}
              types={types}
              ref={(column) => (this.columnsRef[index] = column)}
            />
          ))}
      </Modal>
    );
  }
}

export default withContext(TableCreate);
