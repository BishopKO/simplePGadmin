import React from 'react';
import { connect } from 'react-redux';
import UserTemplate from 'components/templates/UserTamplate';

const TablesView = () => <UserTemplate>Tables</UserTemplate>;

const mapStateToProps = (state) => {
  const loggedin = state.loggedIn;
  return { loggedin };
};

export default connect(mapStateToProps)(TablesView);
