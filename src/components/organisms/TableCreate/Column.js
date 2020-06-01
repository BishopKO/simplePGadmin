import React, { Component } from 'react';
import {
  StyledAddColumn,
  StyledBorderColumnName,
  StyledBorderPK,
  StyledBorderType,
  StyledBorderWidth,
  StyledInput,
  StyledInputCheckbox,
  StyledSelect,
} from './tableCreateStyles';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: null,
      widthValue: 0,
      typeValue: 'SERIAL',
    };
  }

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  render() {
    const { colNumber, types, isPrimaryKey, setPrimaryKey } = this.props;

    return (
      <StyledAddColumn>
        <StyledBorderColumnName label="Column name">
          <StyledInput onChange={(el) => this.setState({ nameValue: el.target.value })} />
        </StyledBorderColumnName>
        <StyledBorderType label="type">
          <StyledSelect>
            {types.map((item, index) => (
              <option
                key={this.createKey(item, index)}
                value={item}
                onClick={(element) => this.setState({ typeValue: element.target.value })}
              >
                {item}
              </option>
            ))}
          </StyledSelect>
        </StyledBorderType>
        <StyledBorderWidth
          label="width"
          onChange={(el) => this.setState({ widthValue: el.target.value })}
          disabled={this.state.typeValue !== 'VARCHAR' && this.state.typeValue !== 'CHAR'}
        >
          <StyledInput />
        </StyledBorderWidth>
        <StyledBorderPK label="pk">
          <StyledInputCheckbox
            type="checkbox"
            onClick={() => {
              setPrimaryKey(colNumber);
            }}
            checked={isPrimaryKey}
          />
        </StyledBorderPK>
      </StyledAddColumn>
    );
  }
}

export default Column;
