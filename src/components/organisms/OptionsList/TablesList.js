import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  StyledWrapper,
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
      activeElement: this.props.config.currentTbl,
      activeOption: 'tblCreate',
      options: [
        { value: 'tblOptions', name: 'Table options...' },
        { value: 'tblCreate', name: 'Create new table' },
        { value: 'tblInsert', name: 'Insert into table' },
        { value: 'tblSearchUpdate', name: 'Search/Update table' },
        { value: 'tblDrop', name: 'Drop table' },
      ],
    };
    this.createPathname = this.createPathname.bind(this);
    this.handleUseOption = this.handleUseOption.bind(this);
  }

  createPathname(option) {
    const { activeElement } = this.state;
    switch (option) {
      case 'tblCreate':
        return '/tblCreate';
      case 'tblInsert':
        return '/tblInsert/' + activeElement;
      case 'tblRename':
        return '/tblRename/' + activeElement;
      case 'tblDrop':
        return '/tblDrop/' + activeElement;
      case 'tblSearchUpdate':
        return '/tblSearchUpdate/' + activeElement;
      default:
        return '/';
    }
  }

  handleUseOption = (item) => {
    const path = this.createPathname(item);
    this.props.history.push(path);
  };

  createKey(value, index) {
    return `${index}_${value}`;
  }

  render() {
    const { tables, config } = this.props;

    return (
      <StyledBorder label="TABLES">
        <StyledWrapper>
          <StyledMenuWrapper>
            <StyledSelect
              onChange={(element) => this.handleUseOption(element.target.value)}
              disabled={!config.currentDb}
            >
              {this.state.options.map((item, index) => (
                <option
                  key={this.createKey(item, index)}
                  value={item.value}
                  onClick={() => this.handleUseOption(item.value)}
                  disabled={
                    item.value !== 'tblOptions' && item.value !== 'tblCreate' && !config.currentTbl
                  }
                >
                  {item.name}
                </option>
              ))}
            </StyledSelect>
          </StyledMenuWrapper>

          <StyledList>
            {tables.map((item, index) => (
              <StyledLi
                key={this.createKey(item, index)}
                onClick={() => {
                  this.setState({ activeElement: item });
                  config.currentTbl = item;
                }}
                active={config.currentTbl === item}
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
