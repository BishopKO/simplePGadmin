import React from 'react';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import Modal from 'components/atoms/Modal/Modal';
import StyledTitle from 'components/atoms/StyledTitle/StyledTitle';

const TableRename = ({ location }) => {
  const { tableName } = location.state;
  return (
    <MainWindowTemplate>
      <Modal>
        <StyledTitle>
          RENAME DATABASE <span>{tableName}</span> TO:
        </StyledTitle>
      </Modal>
    </MainWindowTemplate>
  );
};

export default TableRename;
