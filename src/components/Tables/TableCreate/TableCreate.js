import React, { Component, createRef } from 'react';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';

import MainWindowTemplate from 'templates/MainWindowTemplate';
import Modal from 'components/atoms/Modal/Modal';
import addIcon from 'assets/addIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import saveIcon from 'assets/saveIcon.svg';
import TableCreateColumn from './TableCreateColumn';
import { connect } from 'react-redux';
import { StyledTitle, StyledButtonsWrapper, StyledIconButton } from './tableCreateStyles';

import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';

import { createTableAction, getTablesAction } from 'actions';

class TableCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      columnsRefs: [],
      showGrants: false,
      tableName: '',
      primaryKeyColumn: null,
    };
    this.handleCreateNewColumn = this.handleCreateNewColumn.bind(this);
    this.handleRemoveColumns = this.handleRemoveColumns.bind(this);
    this.handleSaveTable = this.handleSaveTable.bind(this);
    this.setPrimaryKeyColumn = this.setPrimaryKeyColumn.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

  setPrimaryKeyColumn(val) {
    this.setState({ primaryKeyColumn: val });
  }

  handleCreateNewColumn() {
    let columns = this.state.columns;
    columns.push({});
    this.setState({
      columns: columns,
    });
  }

  updateValues(colNumber, name, value) {
    console.log(colNumber, name, value);
  }

  handleRemoveColumns() {
    this.setState({ columns: 0, columnsRefs: [] });
  }

  handleSaveTable = () => {
    console.log(this.state.columns);
    // const { createTable, getDatabaseTables, config, history } = this.props;
    // config.tableName = this.state.tableName;
    //
    // let columns = this.state.columnsRefs.map((item) => item.state);
    //
    // if (this.state.primaryKeyColumn) {
    //   columns[this.state.primaryKeyColumn].primaryKey = true;
    // }
    // config.columns = JSON.stringify(columns);
    //
    // console.log(columns);

    // createTable(config)
    //   .then(() => getDatabaseTables(config))
    //   .then(() => history.push('/'));
  };

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  render() {
    const { types } = this.props.context;
    const { currentDb } = this.props.config;
    return (
      <MainWindowTemplate>
        <Modal table width="500px">
          <StyledTitle>
            CREATE NEW TABLE IN DATABASE <span>{currentDb}</span>
          </StyledTitle>

          <StyledButtonsWrapper>
            <InputWithBorder
              name="table_name"
              colNumber={-1}
              activeUpdate
              type="text"
              label="Table name"
              width="60%"
              onChange={(element) => this.setState({ tableName: element.target.value })}
            />
            <StyledIconButton label="Add" icon={addIcon} onClick={this.handleCreateNewColumn} />
            <StyledIconButton label="Reset" icon={trashIcon} onClick={this.handleRemoveColumns} />
            <StyledIconButton label="Save" icon={saveIcon} onClick={this.handleSaveTable} />
          </StyledButtonsWrapper>

          {this.state.columns.map((item, index) => (
            <TableCreateColumn
              colNumber={index}
              key={this.createKey('column', index)}
              setPrimaryKey={() => this.setPrimaryKeyColumn(index)}
              isPrimaryKey={index === this.state.primaryKeyColumn}
              types={types}
              updateValue={() => this.updateValues}
            />
          ))}
        </Modal>
      </MainWindowTemplate>
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
  createTable: (config) => dispatch(createTableAction(config)),
  getDatabaseTables: (config) => dispatch(getTablesAction(config)),
});

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps, mapDispatchToProps)(withContext(TableCreate));
