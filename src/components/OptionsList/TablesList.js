import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createKey from 'utils/genReactKey';
import tablesListOptions from 'utils/tablesListOptions';
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
      options: tablesListOptions,
    };
    this.handleUseOption = this.handleUseOption.bind(this);
  }

  handleUseOption = (option) => {
    this.props.history.push({
      pathname: option,
      state: { tblName: this.state.activeElement },
    });
  };

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
                  key={createKey(item, index)}
                  value={item.value}
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
                key={createKey(item, index)}
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
