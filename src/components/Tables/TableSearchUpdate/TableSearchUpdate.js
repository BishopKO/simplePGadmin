import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import StyledTitle from 'components/atoms/StyledTitle/StyledTitle';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import StyledInput from 'components/atoms/StyledInput/StyledInput';

import trashIcon from 'assets/trashIcon.svg';
import editIcon from 'assets/editIcon.svg';

import { connect } from 'react-redux';
import { StyledTable, StyledIconButton } from './TableSearchUpdateStyles';
import { getTableAllDataAction, getTableWhereDataAction } from 'actions/index';
import createKey from 'utils/genReactKey';

const TableSearchUpdate = ({
  history,
  config,
  columnsNames,
  columnsData,
  getColumnsAll,
  getColumnsWhere,
}) => {
  useEffect(() => {
    getColumnsAll(config);

    const searchOnEnterInput = document.querySelector('#searchOnEnter');
    searchOnEnterInput.addEventListener('keypress', searchOnEnter);
  }, []);

  const searchOnEnter = (evt) => {
    if (evt.key === 'Enter') {
      const searchOnEnterInput = document.querySelector('#searchOnEnter').value;
      const [column, value] = searchOnEnterInput.split('=');
      config.searchColumn = column;
      config.searchValue = value;
      if (value) {
        getColumnsWhere(config);
      } else {
        getColumnsAll(config);
      }
    }
  };

  const sortBy = (columnName) => {
    config.order = columnName;
    getColumnsAll(config);
  };

  const handleRowEdit = (colNumber) => {
    const dataToEdit = {};
    columnsNames.forEach((item, index) => {
      Object.assign(dataToEdit, { [item]: columnsData[colNumber][index] });
    });
    history.push({ pathname: '/rowDetails', state: { data: dataToEdit } });
  };

  return (
    <MainWindowTemplate>
      <Modal table width="100px">
        <StyledTitle className="search_input" fontSize="1.5rem">
          Table <span>{config.currentTbl}</span> entries:
        </StyledTitle>

        <BorderWithLabel label="Search..." width="80%">
          <StyledInput id="searchOnEnter" placeholder="column_name=value (% -any char)" />
        </BorderWithLabel>

        <StyledTable>
          <tbody>
            <tr>
              {columnsNames.map((item) => (
                <th onClick={() => sortBy(item)}>{item}</th>
              ))}
              <th>Options</th>
            </tr>
            {columnsData.map((item, index) => (
              <tr key={createKey(index)}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
                <td>
                  <StyledIconButton icon={editIcon} onClick={() => handleRowEdit(index)} />
                  <StyledIconButton icon={trashIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Modal>
    </MainWindowTemplate>
  );
};

TableSearchUpdate.propTypes = {
  config: PropTypes.object.isRequired,
  columnsNames: PropTypes.array.isRequired,
  columnsData: PropTypes.array.isRequired,
  currentTbl: PropTypes.string.isRequired,
};

TableSearchUpdate.defaultProps = {
  currentTbl: 'Default_table_name',
};

const mapStateToProps = (state) => {
  const { config, columnsNames, columnsData } = state;
  return { config, columnsNames, columnsData };
};

const mapDispatchToProps = (dispatch) => ({
  getColumnsAll: (config) => dispatch(getTableAllDataAction(config)),
  getColumnsWhere: (config) => dispatch(getTableWhereDataAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableSearchUpdate);
