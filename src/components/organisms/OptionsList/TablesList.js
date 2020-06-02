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
      options: [
        { value: 'tblOptions', name: 'Table options...' },
        { value: 'tblCreate', name: 'Create new table' },
        { value: 'tblInsert', name: 'Insert into table' },
        { value: 'tblUpdate', name: 'Update table' },
        { value: 'tblGrants', name: 'Set table grants' },
        { value: 'tblShowSearch', name: 'Search in table' },
        { value: 'tblDrop', name: 'Drop table' },
      ],
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
    const { tables } = this.props;
    return (
      <StyledBorder label="Tables options...">
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

TablesList.propTypes = {
  tables: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
};

TablesList.dedaultProps = {
  tables: [],
};

const mapStateToProps = (state) => {
  const { tables, config } = state;
  return { tables, config };
};

export default connect(mapStateToProps)(TablesList);
