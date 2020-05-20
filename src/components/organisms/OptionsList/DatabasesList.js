import React, { Component } from 'react';
import goIcon from 'assets/goIcon.svg';
import { connect } from 'react-redux';
import { getTablesAction } from 'actions';
import { Link } from 'react-router-dom';
import {
  StyledBorder,
  StyledMenuWrapper,
  StyledList,
  StyledLi,
  StyledSelect,
  StyledGoButton,
  StyledWrapper,
} from './StyledDatabases';

class DatabasesList extends Component {
  constructor({ getDatabaseTables, config }) {
    super();
    this.state = {
      getDatabaseTables,
      config,
      activeElement: null,
      activeOption: 'dbCreate',
    };
    this.createPathname = this.createPathname.bind(this);
    this.handleGetTablesOnClick = this.handleGetTablesOnClick.bind(this);
  }

  createPathname() {
    const { activeOption, activeElement } = this.state;
    switch (activeOption) {
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

  createKey(value, index) {
    return `${index}_${value}`;
  }

  componentDidUpdate() {
    const { errors } = this.props;
    if (errors) {
      console.log(errors);
    }
  }

  handleGetTablesOnClick(element) {
    const config = this.state.config;
    config.database = element;
    this.state.getDatabaseTables(config);
    this.setState({ activeElement: element });
  }

  render() {
    const { options, label, databases } = this.props;
    return (
      <StyledBorder label={label}>
        <StyledWrapper>
          <StyledMenuWrapper>
            <StyledSelect className="options">
              {options.map((item, index) => (
                <option
                  key={this.createKey(item, index)}
                  value={item.value}
                  onClick={() => this.setState({ activeOption: item.value })}
                >
                  {item.name}
                </option>
              ))}
            </StyledSelect>
            <StyledGoButton as={Link} to={this.createPathname} icon={goIcon} />
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

const mapStateToProps = (state) => {
  const { config, loggedIn, databases } = state;
  return { config, loggedIn, databases };
};

const mapDispatchToProps = (dispatch) => ({
  getDatabaseTables: (databaseName) => dispatch(getTablesAction(databaseName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabasesList);
