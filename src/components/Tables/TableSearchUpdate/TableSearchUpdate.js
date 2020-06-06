import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';

import StyledTitle from 'components/atoms/StyledTitle/StyledTitle';
import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';
import viewIcon from 'assets/viewIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import editIcon from 'assets/editIcon.svg';
import { StyledTable, StyledIconButton } from './TableSearchUpdateStyles';
import { getTableAllDataAction, getTableWhereDataAction } from 'actions/index';

class TableSearchUpdate extends Component {
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

  render() {
    const { columnsNames, columnsData } = this.props;
    const { currentTbl } = this.props.config;
    return (
      <MainWindowTemplate>
        <Modal table width={columnsNames.length * 100 + 'px'}>
          <StyledTitle className="search_input" fontSize="1.5rem">
            Table <span>{currentTbl}</span> entries:
          </StyledTitle>
          <InputWithBorder
            className="SearchInput"
            height="25px"
            width="80%"
            label="Search in table"
            placeholder="example: column_name=value (* -replaces any char)"
          />
          <StyledTable>
            <tr>
              {columnsNames.map((item) => (
                <th>{item}</th>
              ))}
              <th>Options</th>
            </tr>
            <tbody>
              {columnsData.map((item) => (
                <tr>
                  {Object.values(item).map((val) => (
                    <td>{val}</td>
                  ))}
                  <td>
                    <StyledIconButton icon={viewIcon} />
                    <StyledIconButton icon={editIcon} />
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
  const { config, columnsNames, columnsData } = state;
  return { config, columnsNames, columnsData };
};

const mapDispatchToProps = (dispatch) => ({
  getTableColumnsAll: (config) => dispatch(getTableAllDataAction(config)),
  getTableColumnsWhere: (config) => dispatch(getTableWhereDataAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableSearchUpdate);
