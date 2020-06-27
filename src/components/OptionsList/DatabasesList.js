import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createKey from 'utils/genReactKey';
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

const DatabasesList = ({ history, config, databases, getDatabaseTables, loggedIn }) => {
  const [activeOption, setActiveOption] = useState('dbCreate');
  const [activeDb, setActiveDb] = useState('');

  const options = [
    { value: 'dbOptions', name: 'Database options...' },
    { value: 'dbCreate', name: 'Create database' },
    { value: 'dbRename', name: 'Rename database' },
    { value: 'dbDrop', name: 'Drop database' },
  ];

  useEffect(() => {
    console.log(config);
  });

  const createPathname = (option) => {
    switch (option) {
      case 'dbCreate':
        return '/dbCreate/';
      case 'dbRename':
        return '/dbRename/' + activeDb;
      case 'dbDrop':
        return '/dbDrop/' + activeDb;
      default:
        return '/';
    }
  };

  const handleGetTablesOnClick = (element) => {
    const currentDatabase = element.target.name;
    config.currentTbl = '';
    config.currentDb = element;

    setActiveDb(currentDatabase);
    getDatabaseTables(config);
  };

  const handleUseOption = (item) => {
    const path = createPathname(item, activeOption);
    history.push(path);
  };

  return (
    <StyledBorder label="Databases">
      <StyledWrapper>
        <StyledMenuWrapper>
          <StyledSelect onChange={(element) => handleUseOption(element)}>
            {options.map((item, index) => (
              <option
                key={createKey(item, index)}
                value={item.value}
                disabled={item.value !== 'dbOptions' && item.value !== 'dbCreate' && !activeDb}
              >
                {item.name}
              </option>
            ))}
          </StyledSelect>
        </StyledMenuWrapper>

        {loggedIn && (
          <StyledList>
            {databases.map((item, index) => (
              <StyledLi
                key={createKey(item, index)}
                onClick={() => handleGetTablesOnClick(item)}
                active={activeDb === item}
              >
                {item}
              </StyledLi>
            ))}
          </StyledList>
        )}
      </StyledWrapper>
    </StyledBorder>
  );
};

DatabasesList.propTypes = {
  config: PropTypes.object.isRequired,
  getDatabaseTables: PropTypes.func.isRequired,
  databases: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

DatabasesList.defaultProps = {
  options: [],
  databases: [1, 2, 3],
  label: 'Default label',
};

const mapStateToProps = (state) => {
  const { config, databases, tables, loggedIn } = state;
  return { config, databases, tables, loggedIn };
};

const mapDispatchToProps = (dispatch) => ({
  getDatabaseTables: (databaseName) => dispatch(getTablesAction(databaseName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabasesList);
