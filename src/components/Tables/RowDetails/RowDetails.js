import React, { useState } from 'react';

import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import IconButton from 'components/atoms/IconButton/IconButton';
import Button from 'components/atoms/Button/Button';
import StyledInput from 'components/atoms/StyledInput/StyledInput';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import saveIcon from 'assets/saveIcon.svg';

import { StyledTitle, StyledButtonsWrapper } from './rowDetailsStyles';
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

const RowDetails = ({ location, history, config, updateRow }) => {
  const [rowData, setRowData] = useState({});

  const handleSetRowData = (element) => {
    const name = element.target.name;
    const value = element.target.value;
    setRowData(Object.assign(rowData, { [name]: value }));
  };

  const handleUpdateRow = () => {
    config.oldRowData = location.state.data;
    config.newRowData = rowData;
    updateRow(config).then(() => history.goBack());
  };

  const { data } = location.state;

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
        {Object.entries(data).map(([name, value]) => (
          <StyledRowsWrapper>
            <BorderWithLabel label={name} width="100%">
              <StyledInput
                defaultValue={value}
                name={name}
                onChange={(element) => handleSetRowData(element)}
              />
            </BorderWithLabel>
          </StyledRowsWrapper>
        ))}
      </Modal>
    </MainWindowTemplate>
  );
};

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

const mapDispatchToProps = (dispatch) => ({
  updateRow: (config) => dispatch(updateRowAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RowDetails);
