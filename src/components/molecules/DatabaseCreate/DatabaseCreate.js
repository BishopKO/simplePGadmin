import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'components/atoms/Modal/Modal';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import withContext from 'hoc/withContext';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import { NavLink } from 'react-router-dom';

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const StyledInput = styled.input`
  width: 200px;
  height: 30px;
`;

const StyledCreateButton = styled.button`
  width: 60px;
  height: 30px;
  padding: 0;
  margin: 0;
`;

const StyledGrants = styled(BorderWithLabel)`
  border: 1px solid black;
  label {
    font-size: 10px;
  }
`;

const StyledTitlte = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
`;

const DatabaseCreate = ({ match, context }) => {
  const [showModal, setShowModal] = useState(true);

  useState(() => {
    console.log(match.params.id);
  });

  return (
    <div>
      {showModal && (
        <Modal action={() => setShowModal(false)}>
          <StyledTitlte>Create new database</StyledTitlte>
          <StyledInputWrapper>
            <div>
              <StyledInput placeholder="Database name." />
              <StyledCreateButton>Create</StyledCreateButton>
            </div>
          </StyledInputWrapper>
          <StyledGrants label="Grants" width={'230px'}>
            {context.grants.map((item) => (
              <label>
                <input key={item} id={item.toLocaleLowerCase()} type="checkbox" value={item} />
                {item}
              </label>
            ))}
          </StyledGrants>
        </Modal>
      )}
    </div>
  );
};

export default withContext(DatabaseCreate);
