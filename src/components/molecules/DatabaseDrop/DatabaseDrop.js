import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'components/atoms/Modal/Modal';
import Button from 'components/atoms/Button/Button';

const StyledWarning = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
  color: red;
  text-transform: uppercase;
`;

const StyledInfo = styled.p`
  display: flex;
  margin-top: 10px;
  font-size: 16px;
  height: 100%;
  span:nth-child(2) {
    color: red;
  }
`;

const StyledButtonsWrapper = styled.div`
  height: 100%;
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

const DatabaseDrop = ({ database }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {showModal && (
        <Modal action={() => setShowModal(false)}>
          <StyledWarning>DROP DATABASE</StyledWarning>
          <StyledInfo>
            <span>Delete database:</span> <span>{database}</span> <span>?</span>
          </StyledInfo>
          <StyledButtonsWrapper>
            <StyledButton onClick={() => setShowModal(false)} color={'blue'}>
              No
            </StyledButton>
            <StyledButton color={'red'}>Yes</StyledButton>
          </StyledButtonsWrapper>
        </Modal>
      )}
    </div>
  );
};

export default DatabaseDrop;
