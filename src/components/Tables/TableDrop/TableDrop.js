import React from 'react';

import PropTypes from 'prop-types';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dropTableAction, getTablesAction } from 'actions';
import { StyledQuestion, StyledButtonsWrapper, StyledWarning } from './tableDropStyles';
import Button from 'components/atoms/Button/Button';

const TableDrop = ({ dropTable, config, getTables }) => {
  let history = useHistory();
  const tableName = config.currentTbl;

  const handleDropTable = () => {
    config.tableName = tableName;
    dropTable(config)
      .then(() => getTables(config))
      .then(() => history.push('/'));
  };

  return (
    <MainWindowTemplate>
      <Modal height="150px">
        <StyledWarning>
          DROP TABLE <span>{tableName}</span> !
        </StyledWarning>
        <StyledQuestion>Are You sure You want to delete table?</StyledQuestion>
        <StyledButtonsWrapper>
          <Button onClick={() => history.push('/')} bgColor="green">
            No
          </Button>
          <Button onClick={handleDropTable} bgColor="red">
            Yes
          </Button>
        </StyledButtonsWrapper>
      </Modal>
    </MainWindowTemplate>
  );
};

TableDrop.propTypes = {
  match: PropTypes.object.isRequired,
  dropTable: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dropTable: (config) => dispatch(dropTableAction(config)),
  getTables: (config) => dispatch(getTablesAction(config)),
});

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDrop);
