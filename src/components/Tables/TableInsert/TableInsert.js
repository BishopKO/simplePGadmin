import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import TableInsertColumn from './TableInsertColumn';
import saveIcon from 'assets/saveIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import IconButton from 'components/atoms/IconButton/IconButton';
import createKey from 'helpers/genReactKey';
import { insertTableAction } from 'actions';
import { connect } from 'react-redux';
import { StyledTitle, StyledButtonsWrapper } from './tableInsertStyles';

class TableInsert extends Component {
  constructor() {
    super();
    this.state = {
      columns: [],
    };
    this.columnsToState = this.columnsToState.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.columnsToState();
    sessionStorage.setItem('columns', JSON.stringify({}));
  }

  columnsToState() {
    const { config } = this.props;

    const types = {
      integer: 'INT',
      numeric: 'INT',
      'character varying': 'VARCHAR',
      character: 'CHAR',
      money: 'MONEY',
      text: 'TEXT',
      'time without time zone': 'TIME',
      date: 'DATE',
      'timestamp without time zone': 'TIMESTAMP',
      boolean: 'BOOL',
    };

    axios.post('http://127.0.0.1:800/get_columns', { config }).then(
      function (resp) {
        if (resp.data.data) {
          const state = resp.data.data.map((item) => {
            let { column_name, data_type, character_maximum_length } = item;
            return {
              name: column_name,
              type: types[data_type],
              length: parseInt(character_maximum_length),
              autoIncrement: !!item.column_default,
            };
          });
          this.setState({ columns: state });
          console.log(state);
        }
      }.bind(this),
    );
  }

  handleSave = () => {
    const { config, insertTable, history, rowToEdit } = this.props;
    config.columnsData = rowToEdit;
    insertTable(config).then(() => history.push('/'));
  };

  render() {
    const { name } = this.props.match.params;

    return (
      <MainWindowTemplate>
        <Modal table width="500px">
          <StyledTitle>
            INSERT INTO TABLE <span>{name}</span>
          </StyledTitle>
          <StyledButtonsWrapper>
            <IconButton onClick={this.handleSave} icon={saveIcon} label="Save" />
            <IconButton icon={trashIcon} label="Undo" marginRight="10px" />
          </StyledButtonsWrapper>

          {/*TODO: ADD WRAPPER WITH OVERFLOW-Y AUTO*/}
          {this.state.columns.map((item, index) => (
            <TableInsertColumn
              withRedux
              colNumber={index}
              autoIncrement={item.autoIncrement}
              key={createKey(item, index)}
              name={item.name}
              type={item.type}
              length={item.length > 0 ? item.length.toString() : '-'}
            />
          ))}
        </Modal>
      </MainWindowTemplate>
    );
  }
}

TableInsert.propTypes = {
  config: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { config, rowToEdit } = state;
  return { config, rowToEdit };
};

const mapDispatchToProps = (dispatch) => ({
  insertTable: (config) => dispatch(insertTableAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableInsert);
