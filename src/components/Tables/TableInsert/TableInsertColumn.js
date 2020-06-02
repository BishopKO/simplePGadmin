import React, { Component } from 'react';
import {
  StyledAddColumn,
  StyledBorderColumnName,
  StyledBorderPK,
  StyledBorderType,
  StyledBorderWidth,
  StyledInput,
  StyledInputCheckbox,
  StyledType,
} from './tableInsertStyles';

class InsertColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const { type, length, isPrimaryKey, label, autoIncrement } = this.props;

    return (
      <StyledAddColumn>
        <StyledBorderColumnName label={label}>
          <StyledInput
            onChange={(el) => this.setState({ value: el.target.value })}
            disabled={autoIncrement}
            value={autoIncrement ? 'AUTO' : ''}
          />
        </StyledBorderColumnName>
        <StyledBorderType label="type">
          <StyledType value={autoIncrement ? 'SERIAL' : type} disabled />
        </StyledBorderType>

        <StyledBorderWidth label="length">
          <StyledInput value={length} disabled center />
        </StyledBorderWidth>

        <StyledBorderPK label="pk">
          <StyledInputCheckbox type="checkbox" checked={isPrimaryKey} disabled />
        </StyledBorderPK>
      </StyledAddColumn>
    );
  }
}

export default InsertColumn;
