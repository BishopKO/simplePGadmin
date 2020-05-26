import React, { Component, forwardRef } from 'react';
import { connect } from 'react-redux';
import { setTablePrimaryKeyAction } from 'actions';
import {
  StyledAddColumn,
  StyledBorderName,
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
      colNumber: this.props.colNumber,
      nameValue: null,
      widthValue: 0,
      primaryKeyValue: false,
      typeValue: 'SERIAL',
    };
  }

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { primaryKeyColumn } = this.props;
    switch (primaryKeyColumn !== prevProps.primaryKeyColumn) {
      case true:
        if (primaryKeyColumn === this.state.colNumber) this.setState({ primaryKeyValue: true });
        if (primaryKeyColumn !== this.state.colNumber) this.setState({ primaryKeyValue: false });
        break;
      default:
        break;
    }
  }

  handleSetPrimaryKey = () => {
    const { primaryKeyColumn, setPrimaryKey } = this.props;
    if (primaryKeyColumn === this.state.colNumber) {
      setPrimaryKey(-1);
    } else {
      setPrimaryKey(this.state.colNumber);
    }
  };

  render() {
    const { types, value, primaryKeyColumn } = this.props;

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
            onClick={this.handleSetPrimaryKey}
            checked={this.state.colNumber === primaryKeyColumn}
          />
        </StyledBorderPK>
      </StyledAddColumn>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPrimaryKey: (colNumber) => dispatch(setTablePrimaryKeyAction(colNumber)),
});

const mapStateToProps = (state) => {
  const { primaryKeyColumn } = state.createTable;
  return { primaryKeyColumn };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Column);
