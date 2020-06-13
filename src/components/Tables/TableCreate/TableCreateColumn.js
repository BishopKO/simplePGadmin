import React, { Component } from 'react';
import { StyledAddColumn, StyledSelect } from './tableCreateStyles';
import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import createKey from 'helpers/genReactKey';

class TableCreateColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
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

  render() {
    const { colNumber, isPrimaryKey, setPrimaryKey } = this.props;

    return (
      <StyledAddColumn>
        <InputWithBorder withRedux colNumber={colNumber} name="name" />
        <BorderWithLabel width="70px" label="type">
          <StyledSelect onChange={(element) => this.setState({ type: element.target.value })}>
            {this.state.types.map((item, index) => (
              <option key={createKey(item, index)} value={item}>
                {item}
              </option>
            ))}
          </StyledSelect>
        </BorderWithLabel>
        <InputWithBorder
          withRedux
          colNumber={colNumber}
          name="length"
          width="50px"
          disabled={this.state.type !== 'VARCHAR' && this.state.type !== 'CHAR'}
        />
        <InputWithBorder
          withRedux
          colNumber={colNumber}
          name="pk"
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
