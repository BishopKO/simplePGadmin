import React, { Component } from 'react';
import goIcon from 'assets/goIcon.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  StyledWrapper,
  StyledGoButton,
  StyledSelect,
  StyledLi,
  StyledList,
  StyledMenuWrapper,
  StyledBorder,
} from './StyledTables';

class DatabasesList extends Component {
  constructor({ options, label }) {
    super();
    this.state = {
      activeOption: 'tblCreate',
      activeElement: '',
      options,
      label,
    };
    this.createPathname = this.createPathname.bind(this);
  }

  createPathname() {
    const { activeOption, activeElement } = this.state;
    console.log(activeOption, activeElement);
    switch (activeOption) {
      case 'tblCreate':
        return '/tblCreate/';
      case 'tblInsert':
        return '/tblInsert/' + activeElement;
      case 'tblRename':
        return '/tblRename/' + activeElement;
      case 'tblDrop':
        return '/tblDrop/' + activeElement;
      default:
        return '/';
    }
  }

  createKey(value, index) {
    return `${index}_${value}`;
  }

  render() {
    const { tables } = this.props;
    return (
      <StyledBorder label={this.state.label}>
        <StyledWrapper>
          <StyledMenuWrapper>
            <StyledSelect className="options">
              {this.state.options.map((item, index) => (
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
            {tables.map((item, index) => (
              <StyledLi
                key={this.createKey(item, index)}
                onClick={() => this.setState({ activeElement: item })}
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
  const { loggedIn, tables } = state;
  return { loggedIn, tables };
};

export default connect(mapStateToProps)(DatabasesList);
