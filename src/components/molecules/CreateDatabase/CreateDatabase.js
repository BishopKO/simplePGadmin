import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';
import crossIcon from 'assets/crossIcon.svg';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';

const StyledWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  width: 320px;
  height: 100px;
  background: white;
  border: 1px solid black;
  padding: 5px;
  top: 50px;
  border-radius: 5px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
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

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  width: 15px;
  height: 15px;
  top: 3px;
  right: 3px;
`;

const StyledGrants = styled(BorderWithLabel)`
  label {
    font-size: 10px;
  }
`;

const CreateDatabase = () => {
  const [showModal, setShowModal] = useState(true);
  const [grants] = useState(['SELECT', 'INSERT', 'UPDATE', 'DELETE']);

  return (
    <div>
      {showModal && (
        <StyledWrapper>
          <StyledInputWrapper>
            <StyledCloseButton icon={crossIcon} onClick={() => setShowModal(false)} />
            <div>
              <StyledInput placeholder="Database name." />
              <StyledCreateButton>Create</StyledCreateButton>
            </div>
          </StyledInputWrapper>
          <StyledGrants label="Grants" width={'230px'}>
            {grants.map((item) => (
              <label>
                {item}
                <input id={item.toLocaleLowerCase()} type="checkbox" value={item} />
              </label>
            ))}
          </StyledGrants>
        </StyledWrapper>
      )}
    </div>
  );
};

export default CreateDatabase;
