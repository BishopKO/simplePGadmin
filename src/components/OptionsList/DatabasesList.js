import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createKey from 'utils/genReactKey';
import { useHistory } from 'react-router-dom';
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

const DatabasesList = ({ config, databases, getDatabaseTables, loggedIn }) => {
  const [activeDb, setActiveDb] = useState('');
  const history = useHistory();

  const options = [
    { value: 'dbOptions', name: 'Database options...' },
    { value: '/dbCreate', name: 'Create database' },
    { value: '/dbRename', name: 'Rename database' },
    { value: '/dbDrop', name: 'Drop database' },
  ];

  const handleSetActiveDb = (database) => {
    config.currentTbl = '';
    config.currentDb = database;
    setActiveDb(database);
    getDatabaseTables(config);
  };

  const handleUseOption = (option) => {
    history.push(option.target.value);
  };

  return (
    <StyledBorder label="Databases">
      <StyledWrapper>
        <StyledMenuWrapper>
          <StyledSelect disabled={!loggedIn} onChange={(element) => handleUseOption(element)}>
            {options.map((item, index) => (
              <option
                key={createKey(item, index)}
                value={item.value}
                disabled={item.value !== 'dbOptions' && item.value !== '/dbCreate' && !activeDb}
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
                onClick={() => handleSetActiveDb(item)}
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
  databases: [],
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
