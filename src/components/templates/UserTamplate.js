import React, { Component } from 'react';
import styled from 'styled-components';
import SidePanel from 'components/organisms/SidePanel/SidePanel';
import MainWindowTemplate from './MainWindowTemplate';

import { TweenMax, Linear } from 'gsap';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  display: grid;
  width: 600px;
  height: 400px;
  grid-template-columns: 200px 1fr;
  grid-gap: 0;
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
  transition: all 2s linear;
`;

const StyledShowHide = styled.div`
  position: relative;
`;

class UserTemplate extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.loggedin && this.props.loggedin !== prevProps.loggedin) {
      const showHide = document.querySelector('.ShowHide');
      TweenMax.fromTo(showHide, 1, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone });
    }
  }

  render() {
    const { children } = this.props;
    const loggedin = true;

    return (
      <StyledWrapper>
        <SidePanel />
        {loggedin && (
          <StyledShowHide className="ShowHide">
            <MainWindowTemplate>{children}</MainWindowTemplate>
          </StyledShowHide>
        )}
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const loggedin = state.loggedIn;
  return { loggedin };
};

export default connect(mapStateToProps)(UserTemplate);
