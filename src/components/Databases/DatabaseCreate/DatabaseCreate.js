import React, { useState } from 'react';

import Modal from 'components/atoms/Modal/Modal';
import Button from 'components/atoms/Button/Button';
import MainWindowTemplate from 'templates/MainWindowTemplate';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { StyledInput, StyledTitle } from './databaseCreateStyles';
import { createDatabaseAction, getDatabasesAction } from 'actions';

const DatabaseCreate = ({ config, createDatabase, getDatabases }) => {
  const [dbName, setdbName] = useState('');
  let history = useHistory();

  const handleCreateDatabase = () => {
    const testName = RegExp('^[a-z_]+$');

    if (dbName.length > 0 && testName.test(dbName)) {
      config.currentDb = dbName;
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
        <StyledInput
          onChange={(element) => setdbName(element.target.value)}
          placeholder="Database name."
        />
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
