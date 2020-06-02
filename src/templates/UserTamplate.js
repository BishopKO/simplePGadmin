import React, { Component } from 'react';
import styled from 'styled-components';
import SidePanel from 'components/organisms/SidePanel/SidePanel';

import { TweenMax, Linear } from 'gsap';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  display: grid;
  width: 800px;
  height: 400px;
  grid-template-columns: 170px 1fr;
  grid-gap: 0;
  border-radius: 5px;
  border: ${({ theme }) => `3px solid ${theme.border}`};
`;

class UserTemplate extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.loggedin && this.props.loggedin !== prevProps.loggedin) {
      const showHide = document.querySelector('.ShowHide');
      TweenMax.fromTo(showHide, 1, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone });
    }
  }

  render() {
    return (
      <StyledWrapper>
        <SidePanel />
        {this.props.children}
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const loggedIn = state.loggedIn;
  return { loggedIn };
};

export default connect(mapStateToProps)(UserTemplate);
