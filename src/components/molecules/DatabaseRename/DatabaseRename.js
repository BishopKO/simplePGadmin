import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Modal from 'components/atoms/Modal/Modal';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { renameDatabaseAction } from 'actions';

const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;

  span {
    color: green;
  }
`;

const StyledInput = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgray;

  :focus {
    outline: none;
    border: none;
    border-bottom: 1px solid grey;
  }

  ::placeholder {
    text-align: center;
  }
`;

const StyledCreateButton = styled(Button)`
  width: 60px;
  height: 30px;
  padding: 0;
  margin: 0;
  border-radius: 3px;
  justify-self: flex-end;

  :hover {
    background-color: green;
  }
`;

const DatabaseRename = ({ match, renameDatabase, config }) => {
  const [showModal, setShowModal] = useState(true);
  const databaseName = match.params.name;

  let history = useHistory();

  const handleRename = () => {
    const renameInput = document.querySelector('#renameInput').value;

    // config.database = 'log;
    config.databaseNameOld = this.props.match.database;
    config.databaseNameNew = renameDatabase(config);
    history.push('/');
  };

  // TODO: ADD SOURCE DATABASE TO PROPS ADD REDUER ACTION

  return (
    <div>
      {showModal && (
        <Modal action={() => setShowModal(false)}>
          <StyledTitle>
            RENAME DATABASE <span>{databaseName}</span> TO:
          </StyledTitle>
          <StyledInput id="renameInput" placeholder="Database name." />
          <StyledCreateButton bgColor={'grey'} onClick={handleRename}>
            Save
          </StyledCreateButton>
        </Modal>
      )}
    </div>
  );
};

// TODO: ADD mapDispatchToProps from rename database action

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

const mapDispatchToProsp = (dispatch) => ({
  renameDatabase: (config) => dispatch(renameDatabaseAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProsp)(DatabaseRename);
