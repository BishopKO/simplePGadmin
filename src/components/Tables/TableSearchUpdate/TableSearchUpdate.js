import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';

import StyledTitle from 'components/atoms/StyledTitle/StyledTitle';
import viewIcon from 'assets/viewIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import editIcon from 'assets/editIcon.svg';
import { StyledTable, StyledIconButton } from './TableSearchUpdateStyles';
import { getTableDataAction } from 'actions/index';

class TableSearchUpdate extends Component {
  componentDidMount() {
    const { config, getTableColumns } = this.props;
    getTableColumns(config);
  }

  render() {
    const { columnsNames, columnsData } = this.props;
    const { currentTbl } = this.props.config;
    return (
      <MainWindowTemplate>
        <Modal width={columnsNames.length * 100 + 'px'}>
          <StyledTitle fontSize="1.5rem">
            Table <span>{currentTbl}</span> entries:
          </StyledTitle>
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
  getTableColumns: (config) => dispatch(getTableDataAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableSearchUpdate);
