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
    const { type, length, name, autoIncrement, colNumber, withRedux } = this.props;

    return (
      <StyledAddColumn>
        <InputWithBorder
          withRedux
          colNumber={colNumber}
          label={name}
          defaultValue={autoIncrement ? 'AUTO' : null}
          name={name}
          disabled={autoIncrement}
        />
        <InputWithBorder name="type" defaultValue={type} disabled width="70px" centerText />
        <InputWithBorder
          name="length"
          activeUpdate
          width="50px"
          defaultValue={length}
          disabled
          centerText
        />
        <InputWithBorder name="pk" width="20px" height="20px" type="checkbox" disabled />
      </StyledAddColumn>
    );
  }
}

export default InsertColumn;
