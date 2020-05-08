import React, { Component } from 'react';
import UserTemplate from 'components/templates/UserTamplate';
import Select from 'components/molecules/Select/Select';
import styled from 'styled-components';
import { getDatabasesAction } from 'actions';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin-top: 10px;
`;

const StyledTablesListWrapper = styled.div``;

class DatabasesView extends Component {
  constructor() {
    super();
    this.state = {
      databases: [],
    };
  }

  componentDidMount() {
    getDatabasesAction(this.props.config).then((databases) =>
      this.setState({ databases: databases }),
    );
  }

  render() {
    return (
      <UserTemplate>
        <StyledWrapper>
          Databases:
          <Select databases={this.state.databases} />
          <h5>Tables: </h5>
        </StyledWrapper>
      </UserTemplate>
    );
  }
}

const mapStateToProps = (state) => {
  const config = state.config;
  return { config };
};

export default connect(mapStateToProps)(DatabasesView);
