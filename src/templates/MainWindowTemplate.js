import React, { Component } from 'react';
import styled from 'styled-components';
import DatabasesList from 'components/OptionsList/DatabasesList';
import TablesList from 'components/OptionsList/TablesList';
import StyledSpinner from 'components/atoms/Spinner/Spinner';
import LoginForm from 'components/organisms/LoginForm/LoginForm';

import { getDatabasesAction, getTablesAction } from 'actions';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  position: relative;
  padding: 10px;
  display: grid;
  grid-template-columns: 170px 250px 250px;
  grid-gap: 2px;
  justify-items: center;
`;

class MainWindowTemplate extends Component {
  render() {
    const { loading } = this.props;

    return (
      <StyledWrapper>
        {loading && <StyledSpinner />}
        <LoginForm />
        <DatabasesList />
        <TablesList />
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { config, loggedIn, errors, loading } = state;
  return { config, loggedIn, errors, loading };
};

const mapDispatchToProps = (dispatch) => ({
  getDatabases: (config) => dispatch(getDatabasesAction(config)),
  getTables: (config) => dispatch(getTablesAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindowTemplate);
