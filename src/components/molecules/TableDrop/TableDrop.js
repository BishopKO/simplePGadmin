import React from 'react';
import Modal from 'components/atoms/Modal/Modal';
import {
  StyledButton,
  StyledQuestion,
  StyledButtonsWrapper,
  StyledWarning,
} from './tableDropStyles';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dropTableAction, getTablesAction } from 'actions';
import PropTypes from 'prop-types';

const TableDrop = ({ match, dropTable, getTables, config }) => {
  const tableName = match.params.name;
  let history = useHistory();

  const handleDropTable = () => {
    config.tableName = tableName;
    dropTable(config)
      .then(() => getTables(config))
      .then(() => history.push('/'));
  };

  return (
    <Modal>
      <StyledWarning>
        DROP TABLE <span>{tableName}</span> !
      </StyledWarning>
      <StyledQuestion>Are You sure You want to delete table?</StyledQuestion>
      <StyledButtonsWrapper>
        <StyledButton onClick={() => history.push('/')} color={'green'}>
          No
        </StyledButton>
        <StyledButton color={'red'} onClick={handleDropTable}>
          Yes
        </StyledButton>
      </StyledButtonsWrapper>
    </Modal>
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
