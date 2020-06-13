import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTablesAction } from 'actions';

import {
  StyledBorder,
  StyledMenuWrapper,
  StyledList,
  StyledLi,
  StyledSelect,
  StyledWrapper,
} from './optionsListStyles';

class DatabasesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeElement: this.props.config.currentDb,
      activeOption: 'dbCreate',
      options: [
        { value: 'dbOptions', name: 'Database options...' },
        { value: 'dbCreate', name: 'Create database' },
        { value: 'dbRename', name: 'Rename database' },
        { value: 'dbDrop', name: 'Drop database' },
      ],
    };
    this.createPathname = this.createPathname.bind(this);
    this.handleUseOption = this.handleUseOption.bind(this);
    this.handleGetTablesOnClick = this.handleGetTablesOnClick.bind(this);
  }

  createPathname(option) {
    const { activeElement } = this.state;
    switch (option) {
      case 'dbCreate':
        return '/dbCreate/';
      case 'dbRename':
        return '/dbRename/' + activeElement;
      case 'dbDrop':
        return '/dbDrop/' + activeElement;
      default:
        return '/';
    }
  }

  createKey(item, index) {
    return `${index}_${item}`;
  }

  componentDidUpdate() {
    const { errors } = this.props;
    if (errors) {
      console.log(errors);
    }
  }

  handleGetTablesOnClick(element) {
    let config = this.props.config;
    const getDatabaseTables = this.props.getDatabaseTables;
    config.currentTbl = '';
    config.currentDb = element;
    getDatabaseTables(config);
    this.setState({ activeElement: element });
  }

  handleUseOption = (item) => {
    console.log(item);
    const path = this.createPathname(item, this.state.activeElement);
    this.props.history.push(path);
  };

  render() {
    const { databases } = this.props;
    return (
      <StyledBorder label="DATABASES">
        <StyledWrapper>
          <StyledMenuWrapper>
            <StyledSelect onChange={(element) => this.handleUseOption(element.target.value)}>
              {this.state.options.map((item, index) => (
                <option
                  key={this.createKey(item, index)}
                  value={item.value}
                  disabled={
                    item.value !== 'dbOptions' &&
                    item.value !== 'dbCreate' &&
                    !this.state.activeElement
                  }
                >
                  {item.name}
                </option>
              ))}
            </StyledSelect>
          </StyledMenuWrapper>
          <StyledList>
            {databases.map((item, index) => (
              <StyledLi
                key={this.createKey(item, index)}
                onClick={() => this.handleGetTablesOnClick(item)}
                active={this.state.activeElement === item}
              >
                {item}
              </StyledLi>
            ))}
          </StyledList>
        </StyledWrapper>
      </StyledBorder>
    );
  }
}

DatabasesList.propTypes = {
  config: PropTypes.object.isRequired,
  getDatabaseTables: PropTypes.func.isRequired,
  databases: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

DatabasesList.defaultProps = {
  options: [],
  databases: [],
  label: 'Default label',
};

const mapStateToProps = (state) => {
  const { config, databases } = state;
  return { config, databases };
};

const mapDispatchToProps = (dispatch) => ({
  getDatabaseTables: (databaseName) => dispatch(getTablesAction(databaseName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabasesList);
