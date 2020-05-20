import React, { Component } from 'react';
import styled from 'styled-components';
import DatabasesList from 'components/organisms/OptionsList/DatabasesList';
import TablesList from 'components/organisms/OptionsList/TablesList';

import { PageContext, grants } from 'context';
import { getDatabasesAction } from 'actions';
import { connect } from 'react-redux';

const optionsDbs = [
  { value: 'dbCreate', name: 'Create database' },
  { value: 'dbRename', name: 'Rename database' },
  { value: 'dbDrop', name: 'Drop database' },
];

const optionsTbl = [
  { value: 'tblCreate', name: 'Create' },
  { value: 'tblInsert', name: 'Insert' },
  { value: 'tblUpdate', name: 'Update' },
  { value: 'tblShowSearch', name: 'Search' },
];

const StyledWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 2px;
  justify-items: center;
`;

class MainWindowTemplate extends Component {
  constructor() {
    super();
    this.state = {
      currentView: '',
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loggedIn, config, getDatabases } = this.props;

    if (loggedIn) {
      getDatabases(config);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <StyledWrapper>
        {children}
        <PageContext.Provider value={grants}>
          <DatabasesList options={optionsDbs} label="Databases" />
          <TablesList options={optionsTbl} label="Tables" />
        </PageContext.Provider>
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { config, loggedIn, errors } = state;
  return { config, loggedIn, errors };
};

const mapDispatchToProps = (dispatch) => ({
  getDatabases: (config) => dispatch(getDatabasesAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindowTemplate);
