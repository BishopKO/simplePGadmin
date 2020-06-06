import React, { Component } from 'react';
import { StyledAddColumn, StyledSelect } from './tableCreateStyles';
import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';

class TableCreateColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeValue: null,
      types: [
        'Types...',
        'SERIAL',
        'INTEGER',
        'DECIMAL',
        'NUMERIC',
        'MONEY',
        'VARCHAR',
        'CHAR',
        'TEXT',
        'TIME',
        'DATE',
        'TIMESTAMP',
        'BOOL',
      ],
    };
  }

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  handleSelectTypeOnChange = (colNumber, typeValue) => {
    let currentSession = JSON.parse(sessionStorage.getItem('columns'));
    if (!currentSession[colNumber]) {
      currentSession[colNumber] = {};
    }
    currentSession[colNumber] = Object.assign(currentSession[colNumber], {
      column_type: typeValue,
    });
    sessionStorage.setItem('columns', JSON.stringify(currentSession));
    this.setState({ typeValue: typeValue });
  };

  render() {
    const { colNumber, isPrimaryKey, setPrimaryKey } = this.props;

    return (
      <StyledAddColumn>
        <InputWithBorder
          colNumber={colNumber}
          label="Column name"
          activeUpdate
          name="column_name"
          onChange={(el) => this.setState({ nameValue: el.target.value })}
        />
        <BorderWithLabel width="70px" label="type">
          <StyledSelect
            onChange={(element) => this.handleSelectTypeOnChange(colNumber, element.target.value)}
          >
            {this.state.types.map((item, index) => (
              <option
                key={this.createKey(item, index)}
                value={item}
                // onClick={(element) => this.handleSelectOnChange(colNumber, element.target.value)}
              >
                {item}
              </option>
            ))}
          </StyledSelect>
        </BorderWithLabel>
        <InputWithBorder
          colNumber={colNumber}
          name="column_length"
          activeUpdate
          width="50px"
          label="length"
          disabled={this.state.typeValue !== 'VARCHAR' && this.state.typeValue !== 'CHAR'}
        />
        <InputWithBorder
          colNumber={colNumber}
          name="column_pk"
          label="PK"
          width="20px"
          height="20px"
          type="checkbox"
          setPrimaryKey={() => setPrimaryKey(colNumber)}
          checked={isPrimaryKey}
        />
      </StyledAddColumn>
    );
  }
}

export default TableCreateColumn;
