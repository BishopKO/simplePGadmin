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
import { StyledTitle, StyledButtonsWrapper } from './tableCreateStyles';
import IconButton from 'components/atoms/IconButton/IconButton';

import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';

import { createTableAction, getTablesAction } from 'actions';

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
    this.updateValues = this.updateValues.bind(this);
  }

  setPrimaryKeyColumn(val) {
    if (val !== this.state.primaryKeyColumn) {
      this.setState({ primaryKeyColumn: val });
    } else {
      this.setState({ primaryKeyColumn: null });
    }
  }

  componentDidMount() {
    sessionStorage.setItem('columns', JSON.stringify({}));
  }

  handleCreateNewColumn() {
    this.setState({
      columns: this.state.columns + 1,
    });
  }

  updateValues(colNumber, name, value) {
    console.log(colNumber, name, value);
  }

  handleRemoveColumns() {
    this.setState({ columns: 0 });
    sessionStorage.setItem('columns', JSON.stringify({}));
  }

  handleSaveTable = () => {
    const { createTable, getDatabaseTables, config, history } = this.props;
    const tableData = JSON.parse(sessionStorage.getItem('columns'));
    config.columns = JSON.stringify(Object.entries(tableData).map(([key, val]) => val));
    config.primaryKey = this.state.primaryKeyColumn;

    createTable(config)
      .then(() => getDatabaseTables(config))
      .then(() => history.push('/'));
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
              width="50%"
            />
            <div>
              <IconButton label="Add" icon={addIcon} onClick={this.handleCreateNewColumn} />
              <IconButton label="Reset" icon={trashIcon} onClick={this.handleRemoveColumns} />
              <IconButton label="Save" icon={saveIcon} onClick={this.handleSaveTable} />
            </div>
          </StyledButtonsWrapper>

          {Array(this.state.columns)
            .fill(null)
            .map((item, index) => (
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
