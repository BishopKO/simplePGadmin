import React from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
  position: relative;
  background: grey;
`;

const StyledList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: ;
  justify-content: flex-start;
  position: absolute;
  list-style: none;
  background: grey;
  padding: 0;
  margin: 0;
`;

const TopMenu = () => {
  return (
    <StyledNav>
      <StyledList>
        <li>
          <Button as={NavLink} to="/databases" activeclass={'active'}>
            Databases
          </Button>
        </li>
        <li>
          <Button as={NavLink} to="/tables" activeclass={'active'}>
            Tables
          </Button>
        </li>
        <li>
          <Button as={NavLink} to="/users" activeclass={'active'}>
            Users
          </Button>
        </li>
        <li>
          <Button as={NavLink} to="/status" activeclass={'active'}>
            Status
          </Button>
        </li>
      </StyledList>
    </StyledNav>
  );
};

export default TopMenu;
