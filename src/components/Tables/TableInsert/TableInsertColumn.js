import React, { Component } from 'react';
import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';
import { StyledAddColumn } from './tableInsertStyles';

class InsertColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const { type, length, label, autoIncrement, colNumber } = this.props;

    return (
      <StyledAddColumn>
        <InputWithBorder
          colNumber={colNumber}
          label={label}
          value={autoIncrement ? 'AUTO' : null}
          name={label}
          disabled={autoIncrement}
          activeUpdate
        />
        <InputWithBorder label="type" value={type} disabled width="70px" centerText />
        <InputWithBorder
          name="column_length"
          activeUpdate
          width="50px"
          label="length"
          value={length}
          disabled
          centerText
        />
        <InputWithBorder
          name="column_pk"
          label="PK"
          width="20px"
          height="20px"
          type="checkbox"
          disabled
        />
      </StyledAddColumn>
    );
  }
}

export default InsertColumn;
