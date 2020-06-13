import React, { useState } from 'react';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import InputWithBorder from 'components/organisms/InputWithBorder/InputWithBorder';
import { StyledTitle, StyledButtonsWrapper } from './rowDetailsStyles';
import IconButton from 'components/atoms/IconButton/IconButton';
import Button from 'components/atoms/Button/Button';
import saveIcon from 'assets/saveIcon.svg';
import { updateRowAction } from 'actions';
import { connect } from 'react-redux';

import styled from 'styled-components';

const StyledRowsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 10px;
`;

const RowDetails = ({ location, history, config, rowToEdit, updateRow }) => {
  const handleUpdateRow = () => {
    config.oldRowData = location.state;
    config.newRowData = rowToEdit;
    updateRow(config).then(() => history.goBack());
  };

  return (
    <MainWindowTemplate>
      <Modal table width="300px">
        <StyledTitle>
          Table <span>{config.currentTbl}</span>
        </StyledTitle>
        <StyledButtonsWrapper>
          <Button color="black" width="50px" bgColor="lightgrey" onClick={() => history.goBack()}>
            &larr; Back
          </Button>
          <IconButton
            label="save"
            marginRight="10px"
            marginBottom="10px"
            icon={saveIcon}
            onClick={handleUpdateRow}
          />
        </StyledButtonsWrapper>
        {Object.entries(rowToEdit).map(([name, value]) => (
          <StyledRowsWrapper>
            <InputWithBorder
              width="100%"
              name={name}
              defaultValue={value}
              withRedux
              disabled={value === 'pk'}
            />
          </StyledRowsWrapper>
        ))}
      </Modal>
    </MainWindowTemplate>
  );
};

const mapStateToProps = (state) => {
  const { columnsData, columnsNames, config, rowToEdit } = state;
  return { columnsData, columnsNames, config, rowToEdit };
};

const mapDispatchToProps = (dispatch) => ({
  updateRow: (config) => dispatch(updateRowAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RowDetails);