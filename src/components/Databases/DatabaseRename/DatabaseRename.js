import React from 'react';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';

import { StyledTitle, StyledInput } from './databaseRenameStyles';
import Button from 'components/atoms/Button/Button';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDatabasesAction, renameDatabaseAction } from 'actions';
import PropTypes from 'prop-types';

const DatabaseRename = ({ config, renameDatabase, getDatabases }) => {
  let history = useHistory();

  const handleRename = () => {
    const renameInput = document.querySelector('#renameInput').value;
    console.log('Config', config);

    config.newDbName = renameInput;
    renameDatabase(config)
      .then(() => getDatabases(config))
      .then(() => history.push('/'));
  };

  const databaseName = config.currentDb;

  return (
    <MainWindowTemplate>
      <Modal height={'130px'} width={'300px'}>
        <StyledTitle>
          RENAME DATABASE <span>{databaseName}</span> TO:
        </StyledTitle>
        <StyledInput id="renameInput" placeholder="Database name." />
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
