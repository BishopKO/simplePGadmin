import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import TableInsertColumn from './TableInsertColumn';
import saveIcon from 'assets/saveIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import IconButton from 'components/atoms/IconButton/IconButton';

import createKey from 'utils/genReactKey';
import { insertTableAction, getTableSchemaAction } from 'actions';
import { connect } from 'react-redux';
import { StyledTitle, StyledButtonsWrapper } from './tableInsertStyles';

const TableInsert = ({ history, config, tableSchema, getTableSchema, insertIntoTable }) => {
  const [updated, setUpdated] = useState(false);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    if (!updated) {
      getTableSchema(config).then(() => setUpdated(true));
    }
  });

  const handleUpdateTable = (value) => {
    setTableData(Object.assign(tableData, value));
  };

  const handleSave = () => {
    config.insertData = tableData;
    insertIntoTable(config).then(() => history.goBack());
  };

  return (
    <MainWindowTemplate>
      <Modal table width="500px">
        <StyledTitle>
          INSERT INTO TABLE <span>{config.currentTbl}</span>
        </StyledTitle>
        <StyledButtonsWrapper>
          <IconButton icon={saveIcon} label="Save" onClick={handleSave} />
          <IconButton icon={trashIcon} label="Undo" marginRight="10px" />
        </StyledButtonsWrapper>
        {Object.entries(tableSchema).map(([index, item]) => (
          <TableInsertColumn
            colNumber={index}
            key={createKey(item, index)}
            name={item.column_name}
            type={item.column_type}
            length={item.column_length ? item.column_length.toString() : '-'}
            updateData={handleUpdateTable}
          />
        ))}
      </Modal>
    </MainWindowTemplate>
  );
};

TableInsert.propTypes = {
  config: PropTypes.object.isRequired,
  insertTableForm: PropTypes.object.isRequired,
  getTableSchema: PropTypes.object.isRequired,
  insertIntoTable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { config, tableSchema } = state;
  return { config, tableSchema };
};

const mapDispatchToProps = (dispatch) => ({
  getTableSchema: (config) => dispatch(getTableSchemaAction(config)),
  insertIntoTable: (config) => dispatch(insertTableAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableInsert);
