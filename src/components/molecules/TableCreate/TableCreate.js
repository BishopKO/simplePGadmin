import React, { Component, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'components/atoms/Modal/Modal';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import withContext from 'hoc/withContext';

const StyledGrants = styled(BorderWithLabel)`
  border: 1px solid black;
  label {
    font-size: 10px;
  }
`;

const TableCreate = ({ context }) => {
  return (
    <Modal>
      <StyledGrants label="Grants" width={'230px'}>
        {context.grants.map((item) => (
          <label>
            {item}
            <input id={item.toLocaleLowerCase()} type="checkbox" value={item} />
          </label>
        ))}
      </StyledGrants>
    </Modal>
  );
};

export default withContext(TableCreate);
