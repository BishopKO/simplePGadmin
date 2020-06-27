import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';

import Button from 'components/atoms/Button/Button';
import { StyledTitle, StyledInput } from './databaseRenameStyles';
import { connect } from 'react-redux';
import { getDatabasesAction, renameDatabaseAction } from 'actions';

const DatabaseRename = ({ history, config, renameDatabase, getDatabases }) => {
  const [newDbName, setNewDbName] = useState('');

  const handleRename = () => {
    config.newDbName = newDbName;
    renameDatabase(config)
      .then(() => getDatabases(config))
      .then(() => history.push('/'));
  };

  const databaseName = config.currentDb;

  const handleOnChange = (element) => {
    setNewDbName(element.target.value);
  };

  return (
    <MainWindowTemplate>
      <Modal height={'130px'} width={'300px'}>
        <StyledTitle>
          RENAME DATABASE <span>{databaseName}</span> TO:
        </StyledTitle>
        <StyledInput placeholder="Database name." onChange={(element) => handleOnChange(element)} />
        <Button bgColor={'limegreen'} onClick={handleRename}>
          Save
        </Button>
      </Modal>
    </MainWindowTemplate>
  );
};

DatabaseRename.propTypes = {
  match: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  renameDatabase: PropTypes.func.isRequired,
  getDatabases: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

const mapDispatchToProps = (dispatch) => ({
  renameDatabase: (config) => dispatch(renameDatabaseAction(config)),
  getDatabases: (config) => dispatch(getDatabasesAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseRename);
