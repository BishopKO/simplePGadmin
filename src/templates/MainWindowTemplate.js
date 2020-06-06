import React, { Component } from 'react';
import styled from 'styled-components';
import DatabasesList from 'components/organisms/OptionsList/DatabasesList';
import TablesList from 'components/organisms/OptionsList/TablesList';
import StyledSpinner from 'components/atoms/Spinner/Spinner';

import { PageContext } from 'context';
import { getDatabasesAction } from 'actions';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  position: relative;
  padding: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 2px;
  justify-items: center;
`;

class MainWindowTemplate extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loggedIn, config, getDatabases, errors, loading } = this.props;
    if (loggedIn) {
      getDatabases(config);
    }
    if (prevProps.errors.length < errors.length) {
      console.log(errors.slice(-1));
    }
  }

  render() {
    const { children, loading } = this.props;

    return (
      <StyledWrapper>
        {loading && <StyledSpinner />}
        {children}
        <PageContext.Provider>
          <DatabasesList history={this.props.history} />
          <TablesList history={this.props.history} />
        </PageContext.Provider>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindowTemplate);
