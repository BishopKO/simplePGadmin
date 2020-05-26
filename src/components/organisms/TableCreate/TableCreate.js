import React, { Component } from 'react';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';

import addIcon from 'assets/addIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import saveIcon from 'assets/saveIcon.svg';
import setGrantsIcon from 'assets/setGrantsIcon.svg';
import Modal from 'components/atoms/Modal/Modal';
import Column from './Column';
import TableGrants from './TableGrants';
import { StyledButtonsWrapper, StyledIconButton } from './tableCreateStyles';

class TableCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 0,
      columnsRefs: [],
      grantsRef: React.createRef(null),
      showGrants: true,
    };
    this.handleCreateNewColumn = this.handleCreateNewColumn.bind(this);
    this.handleRemoveColumns = this.handleRemoveColumns.bind(this);
    this.handleSaveTable = this.handleSaveTable.bind(this);
  }

  handleCreateNewColumn() {
    this.setState({
      columns: this.state.columns + 1,
      columnsRefs: new Array(this.state.columns + 1).fill(React.createRef()),
    });
  }

  handleRemoveColumns() {
    this.setState({ columns: 0 });
  }

  handleSaveTable = () => {
    this.state.columnsRefs.forEach((item) => {
      console.log(item.state);
    });

    console.log(this.state.grantsRef.current.state);
  };

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  render() {
    const { types } = this.props.context;
    return (
      <Modal createTable>
        <StyledButtonsWrapper>
          <StyledIconButton label="Add" icon={addIcon} onClick={this.handleCreateNewColumn} />
          <StyledIconButton label="Reset" icon={trashIcon} onClick={this.handleRemoveColumns} />
          <StyledIconButton
            label="Grants"
            icon={setGrantsIcon}
            onClick={() => this.setState({ showGrants: !this.state.showGrants })}
          />
          <StyledIconButton label="Save" icon={saveIcon} onClick={this.handleSaveTable} />
        </StyledButtonsWrapper>

        {Array(this.state.columns)
          .fill(null)
          .map((item, index) => (
            <Column
              ref={(element) => (this.state.columnsRefs[index] = element)}
              colNumber={index}
              key={this.createKey('column', index)}
              types={types}
            />
          ))}
        {this.state.showGrants && (
          <TableGrants ref={this.state.grantsRef} grants={this.props.context.grants} />
        )}
      </Modal>
    );
  }
}

TableCreate.propTypes = {
  types: PropTypes.object,
};

export default withContext(TableCreate);
