import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'components/atoms/Modal/Modal';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';

const StyledGrants = styled(BorderWithLabel)`
  align-items: center;
  label {
    white-space: nowrap;
    font-size: 10px;
  }
  span {
    vertical-align: 3px;
  }
`;

const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
  span {
    color: green;
    font-weight: bold;
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

const DatabaseGrants = ({ context, match }) => {
  const [showModal, setShowModal] = useState(true);
  const databaseName = match.params.name;

  return (
    <div>
      {showModal && (
        <Modal action={() => setShowModal(false)}>
          <StyledTitle>
            Set database <span>{databaseName}</span> grants:
          </StyledTitle>
          <StyledGrants label="Grants" width={'230px'}>
            {context.grants.map((item) => (
              <label>
                <input id={item.toLocaleLowerCase()} type="checkbox" value={item} />
                <span>{item}</span>
              </label>
            ))}
          </StyledGrants>
          <StyledButtonsWrapper>
            <StyledButton>Save</StyledButton>
          </StyledButtonsWrapper>
        </Modal>
      )}
    </div>
  );
};

export default withContext(DatabaseGrants);
