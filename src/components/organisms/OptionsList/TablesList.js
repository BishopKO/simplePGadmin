import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
} from './optionsListStyles';

class TablesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: 'tblCreate',
      activeElement: '',
    };
    this.createPathname = this.createPathname.bind(this);
  }

  createPathname() {
    const { activeOption, activeElement } = this.state;
    switch (activeOption) {
      case 'tblCreate':
        return '/tblCreate';
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
    const { options, tables, label } = this.props;
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

TablesList.propTypes = {
  options: PropTypes.array.isRequired,
  tables: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};

TablesList.dedaultProps = {
  options: [],
  tables: [],
};

const mapStateToProps = (state) => {
  const { tables, config } = state;
  return { tables, config };
};

export default connect(mapStateToProps)(TablesList);
