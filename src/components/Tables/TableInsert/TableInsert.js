import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'components/atoms/Modal/Modal';
import MainWindowTemplate from 'templates/MainWindowTemplate';
import TableInsertColumn from './TableInsertColumn';
import saveIcon from 'assets/saveIcon.svg';
import trashIcon from 'assets/trashIcon.svg';
import { connect } from 'react-redux';
import { StyledTitle, StyledButtonsWrapper, StyledIconButton } from './tableInsertStyles';

class TableInsert extends Component {
  constructor() {
    super();
    this.state = {
      columns: [],
    };
    this.columnsToState = this.columnsToState.bind(this);
  }

  componentDidMount() {
    this.columnsToState();
  }

  columnsToState() {
    const { config } = this.props;
    config.tableName = this.props.match.params.name;

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

  createKey = (item, index) => {
    return `${item}_${index}`;
  };

  render() {
    const { name } = this.props.match.params;

    return (
      <MainWindowTemplate>
        <Modal table width="600px">
          <StyledTitle>
            INSERT INTO TABLE <span>{name}</span>
          </StyledTitle>
          <StyledButtonsWrapper>
            <StyledIconButton icon={saveIcon} label="Save" />
            <StyledIconButton icon={trashIcon} label="Undo" />
          </StyledButtonsWrapper>

          {this.state.columns.map((item, index) => (
            <TableInsertColumn
              autoIncrement={item.autoIncrement}
              key={this.createKey(item, index)}
              label={item.name}
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
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps)(TableInsert);
