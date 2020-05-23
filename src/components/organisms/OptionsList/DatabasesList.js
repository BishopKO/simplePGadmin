import React, { Component } from 'react';
import goIcon from 'assets/goIcon.svg';
import PropTypes from 'prop-types';
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
} from './optionsListStyles';

class DatabasesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    config.currentDb = element;
    getDatabaseTables(config);
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
