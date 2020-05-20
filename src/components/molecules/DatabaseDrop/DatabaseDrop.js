import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'components/atoms/Modal/Modal';
import Button from 'components/atoms/Button/Button';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dropDatabaseAction } from 'actions';

const StyledWarning = styled.p`
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  span {
    color: red;
    text-decoration: underline;
  }
`;

const StyledQuestion = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  text-align: center;
`;

const StyledButtonsWrapper = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
  background: ${({ color }) => color};
  width: 100px;
  border-radius: 3px;
`;

const DatabaseDrop = ({ match, dropDatabase, config }) => {
  const [showModal, setShowModal] = useState(true);
  const databaseName = match.params.name;

  let history = useHistory();

  const handleDropDatabase = () => {
    config.database = 'login_db';
    config.databaseName = databaseName;
    dropDatabase(config);
    history.push('/');
  };

  return (
    <div>
      {showModal && (
        <Modal action={() => setShowModal(false)}>
          <StyledWarning>
            DROP DATABASE <span>{databaseName}</span> !
          </StyledWarning>
          <StyledQuestion>Are You sure You want to delete database?</StyledQuestion>
          <StyledButtonsWrapper>
            <StyledButton onClick={() => setShowModal(false)} color={'green'}>
              No
            </StyledButton>
            <StyledButton color={'red'} onClick={handleDropDatabase}>
              Yes
            </StyledButton>
          </StyledButtonsWrapper>
        </Modal>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dropDatabase: (config) => dispatch(dropDatabaseAction(config)),
});

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseDrop);
