import React from 'react';
import Modal from 'components/atoms/Modal/Modal';
import {
  StyledButton,
  StyledQuestion,
  StyledButtonsWrapper,
  StyledWarning,
} from './databaseDropStyles';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dropDatabaseAction, getDatabasesAction } from 'actions';
import PropTypes from 'prop-types';

const DatabaseDrop = ({ match, dropDatabase, getDatabases, config }) => {
  const databaseName = match.params.name;

  let history = useHistory();

  const handleDropDatabase = () => {
    config.currentDb = databaseName;
    console.log('drop', config);
    dropDatabase(config)
      .then(() => getDatabases(config))
      .then(() => history.push('/'));
  };

  return (
    <Modal>
      <StyledWarning>
        DROP DATABASE <span>{databaseName}</span> !
      </StyledWarning>
      <StyledQuestion>Are You sure You want to delete database?</StyledQuestion>
      <StyledButtonsWrapper>
        <StyledButton onClick={() => history.push('/')} color={'green'}>
          No
        </StyledButton>
        <StyledButton color={'red'} onClick={handleDropDatabase}>
          Yes
        </StyledButton>
      </StyledButtonsWrapper>
    </Modal>
  );
};

DatabaseDrop.propTypes = {
  match: PropTypes.object.isRequired,
  dropDatabase: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  getDatabases: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dropDatabase: (config) => dispatch(dropDatabaseAction(config)),
  getDatabases: (config) => dispatch(getDatabasesAction(config)),
});

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseDrop);
