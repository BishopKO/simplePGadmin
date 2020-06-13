import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import StyledTitle from 'components/atoms/StyledTitle/StyledTitle';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import StyledInput from 'components/atoms/StyledInput/StyledInput';

import trashIcon from 'assets/trashIcon.svg';
import editIcon from 'assets/editIcon.svg';
import store from 'store';

import { connect } from 'react-redux';
import { StyledTable, StyledIconButton } from './TableSearchUpdateStyles';
import { getTableAllDataAction, getTableWhereDataAction } from 'actions/index';
import createKey from 'utils/genReactKey';

class TableSearchUpdate extends Component {
  constructor() {
    super();
    this.state = {
      activeRow: null,
    };
  }

  componentDidMount() {
    const searchInput = document.querySelector('.SearchInput');
    const { config, getTableColumnsAll, getTableColumnsWhere } = this.props;

    getTableColumnsAll(config);

    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const [column, value] = searchInput.value.split('=');
        if (column.length > 0) {
          config.searchColumn = column;
          config.searchValue = value;
          getTableColumnsWhere(config);
        } else {
          getTableColumnsAll(config);
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.columnsData.length === 0) {
      this.props.history.push('/');
    }
  }

  createKey = (index) => {
    return `searchRow_${index}`;
  };

  handleGoToRowEdit = (rowNumber) => {
    const { columnsNames, columnsData } = this.props;
    let rowToEdit = {};
    columnsNames.forEach((item, index) =>
      Object.assign(rowToEdit, { [item]: columnsData[rowNumber][index] }),
    );
    store.dispatch({ type: 'ROW_EDIT', payload: rowToEdit });
    this.props.history.push({ pathname: `/rowDetails/${rowNumber}`, state: rowToEdit });
  };

  render() {
    const { columnsNames, columnsData } = this.props;
    const { currentTbl } = this.props.config;
    return (
      <MainWindowTemplate>
        <Modal table width={columnsNames.length * 100 + 'px'}>
          <StyledTitle className="search_input" fontSize="1.5rem">
            Table <span>{currentTbl}</span> entries:
          </StyledTitle>

          <BorderWithLabel label="Search..." width="80%">
            <StyledInput placeholder="column_name=value (% -any char)" />
          </BorderWithLabel>

          <StyledTable>
            <tbody>
              <tr>
                {columnsNames.map((item) => (
                  <th>{item}</th>
                ))}
                <th>Options</th>
              </tr>
              {columnsData.map((item, index) => (
                <tr key={createKey(index)}>
                  {Object.values(item).map((val) => (
                    <td>{val}</td>
                  ))}
                  <td>
                    <StyledIconButton
                      icon={editIcon}
                      onClick={() => this.handleGoToRowEdit(index)}
                    />
                    <StyledIconButton icon={trashIcon} />
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </Modal>
      </MainWindowTemplate>
    );
  }
}

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
  const { config, columnsNames, columnsData, rowEdit } = state;
  return { config, columnsNames, columnsData, rowEdit };
};

const mapDispatchToProps = (dispatch) => ({
  getTableColumnsAll: (config) => dispatch(getTableAllDataAction(config)),
  getTableColumnsWhere: (config) => dispatch(getTableWhereDataAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableSearchUpdate);
