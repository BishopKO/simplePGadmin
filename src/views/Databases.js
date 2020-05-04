import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserTemplate from 'components/templates/UserTamplate';
import { getDatabases } from 'actions/index';

class DatabasesView extends Component {
  constructor({ config }) {
    super();
    this.state = {
      config,
    };
  }

  render() {
    return <UserTemplate></UserTemplate>;
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  const config = state;
  return { config };
};

export default connect(mapStateToProps)(DatabasesView);
