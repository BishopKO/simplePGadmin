import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Modal from 'components/atoms/Modal/Modal';
import { createDatabaseAction } from 'actions';
import { useHistory } from 'react-router-dom';
import { TweenMax } from 'gsap';

import { connect } from 'react-redux';

const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
`;

const StyledInput = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgray;
  text-transform: lowercase;

  :focus {
    outline: none;
    border: none;
    border-bottom: 1px solid grey;
  }

  ::placeholder {
    text-transform: none;
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

const DatabaseCreate = ({ config, createDatabase, loggedIn, show }) => {
  let history = useHistory();

  const handleCreateDatabase = () => {
    // TODO: HANDLE CREATE DATABASE ERRORS
    const name = document.querySelector('#databaseNameInput').value;
    const testName = RegExp('^[a-z_]+$');
    if (name.length > 0 && loggedIn && testName.test(name)) {
      config.databaseName = name;
      createDatabase(config);
      history.push('/');
    } else {
      alert('Incorrect database name.');
    }
  };

  return (
    <div className="dbCreateModal">
      {show && (
        <Modal action={() => history.push('/')}>
          <StyledTitle>CREATE NEW DATABASE</StyledTitle>
          <StyledInput id="databaseNameInput" placeholder="Database name." />
          <StyledCreateButton bgColor={'grey'} onClick={handleCreateDatabase}>
            Create
          </StyledCreateButton>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { config, loggedIn } = state;
  return { config, loggedIn };
};

const mapDispatchToProps = (dispatch) => ({
  createDatabase: (config) => dispatch(createDatabaseAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseCreate);
