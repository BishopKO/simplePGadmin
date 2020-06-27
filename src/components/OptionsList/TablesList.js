import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

const TablesList = ({ config, tables }) => {
  const [selectedTable, setSelectedTable] = useState('');
  const options = tablesListOptions;
  const history = useHistory();

  const handleSelectTable = (table) => {
    setSelectedTable(table);
    config.currentTbl = table;
  };

  const handleUseOption = (element) => {
    const option = '/' + element.target.value;
    history.push(option);
  };

  return (
    <StyledBorder label="TABLES">
      <StyledWrapper>
        <StyledMenuWrapper>
          <StyledSelect
            onChange={(element) => handleUseOption(element)}
            disabled={!config.currentDb}
          >
            {options.map((item, index) => (
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
                handleSelectTable(item);
              }}
              active={selectedTable === item}
            >
              {item}
            </StyledLi>
          ))}
        </StyledList>
      </StyledWrapper>
    </StyledBorder>
  );
};

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
