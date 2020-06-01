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
import { connect } from 'react-redux';
import {
  StyledButtonsWrapper,
  StyledIconButton,
  StyledInput,
  StyledBorderTableName,
} from './tableCreateStyles';

import { createTablesAction, getTablesAction } from 'actions';

class TableCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 0,
      columnsRefs: [],
      grantsRef: React.createRef(),
      showGrants: false,
      tableName: '',
      primaryKeyColumn: null,
    };
    this.handleCreateNewColumn = this.handleCreateNewColumn.bind(this);
    this.handleRemoveColumns = this.handleRemoveColumns.bind(this);
    this.handleSaveTable = this.handleSaveTable.bind(this);
    this.setPrimaryKeyColumn = this.setPrimaryKeyColumn.bind(this);
  }

  setPrimaryKeyColumn(val) {
    this.setState({ primaryKeyColumn: val });
  }

  handleCreateNewColumn() {
    this.setState({
      columns: this.state.columns + 1,
      columnsRefs: new Array(this.state.columns + 1).fill(React.createRef()),
    });
  }

  handleRemoveColumns() {
    this.setState({ columns: 0, columnsRefs: [] });
  }

  handleSaveTable = () => {
    const { createTable, getDatabaseTables, config, history } = this.props;
    config.tableName = this.state.tableName;

    let columns = this.state.columnsRefs.map((item) => item.state);
    columns[this.state.primaryKeyColumn].primaryKey = true;
    config.columns = JSON.stringify(columns);

    console.log('CREATE TABLE', config);
    createTable(config)
      .then(() => getDatabaseTables(config))
      .then(() => history.push('/'));
  };

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  render() {
    const { types } = this.props.context;
    return (
      <Modal createTable>
        <StyledButtonsWrapper>
          <StyledBorderTableName label="Table name">
            <StyledInput
              onChange={(element) => this.setState({ tableName: element.target.value })}
            />
          </StyledBorderTableName>

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
              setPrimaryKey={() => this.setPrimaryKeyColumn(index)}
              isPrimaryKey={index === this.state.primaryKeyColumn}
              types={types}
            />
          ))}
        {this.state.showGrants && <TableGrants ref={this.state.grantsRef} />}
      </Modal>
    );
  }
}

TableCreate.propTypes = {
  createTable: PropTypes.func.isRequired,
  getDatabaseTables: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  types: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  createTable: (config) => dispatch(createTablesAction(config)),
  getDatabaseTables: (config) => dispatch(getTablesAction(config)),
});

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps, mapDispatchToProps)(withContext(TableCreate));
