import React, { Component, createRef } from 'react';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';

import MainWindowTemplate from 'templates/MainWindowTemplate';
import Modal from 'components/atoms/Modal/Modal';
import addIcon from 'assets/addIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import saveIcon from 'assets/saveIcon.svg';
import TableCreateColumn from './TableCreateColumn';
import IconButton from 'components/atoms/IconButton/IconButton';
import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';

import { connect } from 'react-redux';
import { StyledTitle, StyledButtonsWrapper } from './tableCreateStyles';
import { createTableAction, getTablesAction } from 'actions';
import createKey from 'helpers/genReactKey';

class TableCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 0,
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
    if (val !== this.state.primaryKeyColumn) {
      this.setState({ primaryKeyColumn: val });
    } else {
      this.setState({ primaryKeyColumn: null });
    }
  }

  handleCreateNewColumn() {
    this.setState({
      columns: this.state.columns + 1,
    });
  }

  handleRemoveColumns() {
    this.setState({ columns: 0 });
  }

  handleSaveTable = () => {
    const { createTable, getDatabaseTables, config, history, rowToEdit } = this.props;
    console.log(rowToEdit);
    // const tableData = JSON.parse(sessionStorage.getItem('columns'));
    // config.columns = JSON.stringify(Object.entries(tableData).map(([key, val]) => val));
    // config.primaryKey = this.state.primaryKeyColumn;
    //
    // createTable(config)
    //   .then(() => getDatabaseTables(config))
    //   .then(() => history.push('/'));
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
              withRedux
              name="table_name"
              colNumber="table_name"
              type="text"
              label="Table name"
              width="50%"
            />
            <div>
              <IconButton label="Add" icon={addIcon} onClick={this.handleCreateNewColumn} />
              <IconButton label="Reset" icon={trashIcon} onClick={this.handleRemoveColumns} />
              <IconButton
                label="Save"
                icon={saveIcon}
                onClick={this.handleSaveTable}
                marginRight="0"
              />
            </div>
          </StyledButtonsWrapper>

          {Array(this.state.columns)
            .fill(null)
            .map((item, index) => (
              <TableCreateColumn
                colNumber={index}
                key={createKey('column', index)}
                setPrimaryKey={() => this.setPrimaryKeyColumn(index)}
                isPrimaryKey={index === this.state.primaryKeyColumn}
                types={types}
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
  const { config, rowToEdit } = state;
  return { config, rowToEdit };
};

export default connect(mapStateToProps, mapDispatchToProps)(withContext(TableCreate));
