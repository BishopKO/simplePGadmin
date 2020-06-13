import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import Modal from 'components/atoms/Modal/Modal';
import StyledTitle from 'components/atoms/StyledTitle/StyledTitle';
import StyledInput from 'components/atoms/StyledInput/StyledInput';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import ButtonsWrapper from './tableRenameStyles';
import IconButton from 'components/atoms/IconButton/IconButton';

import saveIcon from 'assets/saveIcon.svg';
import { connect } from 'react-redux';
import { renameTableAction, getTablesAction } from 'actions';

const TableRename = ({ history, currentTbl, config, renameTable, getTables }) => {
  const [name, setName] = useState('');

  const handleOnChange = (element) => {
    const newName = element.target.value;
    setName(newName);
  };

  const handleSaveAction = () => {
    config.newTableName = name;
    renameTable(config)
      .then(() => getTables(config))
      .then(() => history.push('/'));
  };

  return (
    <MainWindowTemplate>
      <Modal table height="200px" width="50px">
        <StyledTitle>
          RENAME TABLE <span>{config.currentTbl}</span>
        </StyledTitle>
        <ButtonsWrapper>
          <IconButton
            icon={saveIcon}
            marginRight="0"
            marginBottom="10px"
            label="save"
            onClick={handleSaveAction}
          />
        </ButtonsWrapper>
        <BorderWithLabel label="New table name">
          <StyledInput onChange={(element) => handleOnChange(element)} />
        </BorderWithLabel>
      </Modal>
    </MainWindowTemplate>
  );
};

TableRename.propTypes = {
  config: PropTypes.object.isRequired,
  renameTable: PropTypes.func.isRequired,
  getTables: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

const mapDispatchToProps = (dispatch) => ({
  renameTable: (config) => dispatch(renameTableAction(config)),
  getTables: (config) => dispatch(getTablesAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableRename);
