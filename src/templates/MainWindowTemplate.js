import React, { useEffect } from 'react';
import styled from 'styled-components';
import DatabasesList from 'components/OptionsList/DatabasesList';
import TablesList from 'components/OptionsList/TablesList';
import StyledSpinner from 'components/atoms/Spinner/Spinner';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import { TweenMax, Linear } from 'gsap';

import { getDatabasesAction, getTablesAction } from 'actions';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  position: relative;
  padding: 10px;
  display: grid;
  grid-template-columns: 170px 450px;
  grid-gap: 2px;
`;

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const MainWindowTemplate = ({ loggedIn, loading, errors, children }) => {
  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn, errors]);

  return (
    <StyledWrapper>
      {loading && <StyledSpinner />}
      {children}
      <LoginForm />
      <MainWrapper id="mainWindow">
        <DatabasesList />
        <TablesList />
      </MainWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => {
  const { config, loggedIn, errors, loading } = state;
  return { config, loggedIn, errors, loading };
};

const mapDispatchToProps = (dispatch) => ({
  getDatabases: (config) => dispatch(getDatabasesAction(config)),
  getTables: (config) => dispatch(getTablesAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindowTemplate);
