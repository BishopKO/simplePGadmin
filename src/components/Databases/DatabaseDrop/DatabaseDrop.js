import React from 'react';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dropDatabaseAction, getDatabasesAction } from 'actions';
import PropTypes from 'prop-types';
import { StyledQuestion, StyledButtonsWrapper, StyledWarning } from './databaseDropStyles';
import Button from 'components/atoms/Button/Button';

const DatabaseDrop = ({ match, dropDatabase, getDatabases, config }) => {
  const databaseName = match.params.name;

  let history = useHistory();

  const handleDropDatabase = () => {
    config.currentDb = databaseName;
    dropDatabase(config)
      .then(() => getDatabases(config))
      .then(() => history.push('/'));
  };

  return (
    <MainWindowTemplate>
      <Modal height={'130px'} width={'350px'}>
        <StyledWarning>
          DROP DATABASE <span>{databaseName}</span> !
        </StyledWarning>
        <StyledQuestion>Are You sure You want to delete database?</StyledQuestion>
        <StyledButtonsWrapper>
          <Button bgColor="green" onClick={() => history.push('/')}>
            No
          </Button>
          <Button bgColor="red" onClick={handleDropDatabase}>
            Yes
          </Button>
        </StyledButtonsWrapper>
      </Modal>
    </MainWindowTemplate>
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
