import React, { useState, useReducer } from 'react';

import PropTypes from 'prop-types';

import MainWindowTemplate from 'templates/MainWindowTemplate';
import Modal from 'components/atoms/Modal/Modal';

import addIcon from 'assets/addIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import saveIcon from 'assets/saveIcon.svg';
import TableCreateColumn from './TableCreateColumn';
import IconButton from 'components/atoms/IconButton/IconButton';
import StyledInput from 'components/atoms/StyledInput/StyledInput';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';

import { connect } from 'react-redux';
import { StyledTitle, StyledButtonsWrapper } from './tableCreateStyles';
import { createTableAction, getTablesAction } from 'actions';
import createKey from 'utils/genReactKey';
import columnTypes from './columnTypes';

const TableCreate = ({ history, config, createTable, getTables }) => {
  const [columns, setColumnsNumber] = useState(0);
  const [primaryKeyColumn, setPrimaryKey] = useState(null);
  const [tableData, setTableData] = useState({});

  const setPrimaryKeyColumn = (columnNumber) => {
    if (primaryKeyColumn !== columnNumber) {
      setPrimaryKey(columnNumber);
    } else {
      setPrimaryKey(null);
    }
  };

  const handleCreateNewColumn = () => {
    setColumnsNumber(columns + 1);
  };

  const handleRemoveColumns = () => {
    setColumnsNumber(0);
    setPrimaryKey(null);
  };

  const handleSetTableName = (name) => {
    setTableData(Object.assign(tableData, { table_name: name.target.value }));
  };

  const handleSetTableData = (value) => {
    setTableData(Object.assign(tableData, value));
  };

  const handleSaveTable = () => {
    console.log(tableData);
    config.primaryKey = primaryKeyColumn;
    config.tableData = tableData;

    createTable(config)
      .then(() => getTables(config))
      .then(() => history.push('/'));
  };

  const { currentDb } = config;
  return (
    <MainWindowTemplate>
      <Modal table width="500px">
        <StyledTitle>
          CREATE NEW TABLE IN DATABASE <span>{currentDb}</span>
        </StyledTitle>

        <StyledButtonsWrapper>
          <BorderWithLabel label="Table name">
            <StyledInput name="table_name" onChange={(element) => handleSetTableName(element)} />
          </BorderWithLabel>
          <div>
            <IconButton label="Add" icon={addIcon} onClick={handleCreateNewColumn} />
            <IconButton label="Reset" icon={trashIcon} onClick={handleRemoveColumns} />
            <IconButton label="Save" icon={saveIcon} onClick={handleSaveTable} marginRight="0" />
          </div>
        </StyledButtonsWrapper>

        {Array(columns)
          .fill(null)
          .map((item, index) => (
            <TableCreateColumn
              colNumber={index}
              key={createKey('column', index)}
              setPrimaryKey={() => setPrimaryKeyColumn(index)}
              isPrimaryKey={index === primaryKeyColumn}
              types={columnTypes}
              updateData={handleSetTableData}
            />
          ))}
      </Modal>
    </MainWindowTemplate>
  );
};

TableCreate.propTypes = {
  createTable: PropTypes.func.isRequired,
  getDatabaseTables: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  types: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  createTable: (config) => dispatch(createTableAction(config)),
  getTables: (config) => dispatch(getTablesAction(config)),
});

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCreate);
