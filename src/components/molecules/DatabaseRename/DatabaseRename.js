import React from 'react';
import Modal from 'components/atoms/Modal/Modal';
import { StyledCreateButton, StyledTitle, StyledInput } from './databaseRenameStyles';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDatabasesAction, renameDatabaseAction } from 'actions';
import PropTypes from 'prop-types';

const DatabaseRename = ({ match, config, renameDatabase, getDatabases }) => {
  const databaseName = match.params.name;

  let history = useHistory();

  const handleRename = () => {
    const renameInput = document.querySelector('#renameInput').value;
    console.log('Config', config);

    config.databaseNameOld = databaseName;
    config.databaseNameNew = renameInput;
    renameDatabase(config)
      .then(() => getDatabases(config))
      .then(() => history.push('/'));
  };

  return (
    <Modal>
      <StyledTitle>
        RENAME DATABASE <span>{databaseName}</span> TO:
      </StyledTitle>
      <StyledInput id="renameInput" placeholder="Database name." />
      <StyledCreateButton bgColor={'grey'} onClick={handleRename}>
        Save
      </StyledCreateButton>
    </Modal>
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
