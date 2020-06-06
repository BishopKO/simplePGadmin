import React from 'react';
import Modal from 'components/atoms/Modal/Modal';
import { createDatabaseAction, getDatabasesAction } from 'actions';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { StyledInput, StyledTitle } from './databaseCreateStyles';
import Button from 'components/atoms/Button/Button';
import MainWindowTemplate from 'templates/MainWindowTemplate';

const DatabaseCreate = ({ config, createDatabase, getDatabases }) => {
  let history = useHistory();

  const handleCreateDatabase = () => {
    const name = document.querySelector('#databaseNameInput').value;
    const testName = RegExp('^[a-z_]+$');

    if (name.length > 0 && testName.test(name)) {
      config.currentDb = name;
      createDatabase(config)
        .then(() => getDatabases(config))
        .then(() => history.push('/'));
    } else {
      alert('Incorrect database name.');
    }
  };

  return (
    <MainWindowTemplate>
      <Modal height={'130px'} width={'300px'}>
        <StyledTitle>CREATE NEW DATABASE</StyledTitle>
        <StyledInput id="databaseNameInput" placeholder="Database name." />
        <Button bgColor={'limegreen'} onClick={handleCreateDatabase}>
          Create
        </Button>
      </Modal>
    </MainWindowTemplate>
  );
};

DatabaseCreate.propTypes = {
  config: PropTypes.object.isRequired,
  createDatabase: PropTypes.func.isRequired,
  getDatabases: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

const mapDispatchToProps = (dispatch) => ({
  createDatabase: (config) => dispatch(createDatabaseAction(config)),
  getDatabases: (config) => dispatch(getDatabasesAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseCreate);
