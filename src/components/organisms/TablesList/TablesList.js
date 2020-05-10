import React from 'react';
import styled from 'styled-components';

const tables = Array(10).fill('table');

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  width: 250px;
  height: 200px;
  border: 1px solid black;
  border-radius: 3px;
  overflow: hidden;
  padding: 0;
`;

const StyledList = styled.ul`
  height: 100%;
  list-style: none;
  overflow: auto;
  padding: 0;
  margin-top: 0;
  li:nth-child(odd) {
    background: hsl(200, 10%, 90%);
  }
`;

const StyledLi = styled.li`
  padding: 3px 0 0 3px;
  :hover {
    cursor: pointer;
    background: lightgoldenrodyellow !important;
  }
`;

const StyledOptionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
`;

const StyledMenuButton = styled.button`
  background: ${({ bg }) => bg || 'lightblue'};
  color: ${({ color }) => color || 'black'};
  font-size: 12px;
  padding: 0;
  font-weight: bold;
  border: none;
  width: 100%;
  height: 100%;
  border-right: 1px solid grey;
  :hover {
    cursor: pointer;
    background: grey;
  }
`;

const DatabasesList = () => {
  return (
    <StyledWrapper>
      <StyledOptionsWrapper>
        <StyledMenuButton>Create</StyledMenuButton>
        <StyledMenuButton>Grants</StyledMenuButton>
        <StyledMenuButton>Insert</StyledMenuButton>
        <StyledMenuButton>Edit</StyledMenuButton>
        <StyledMenuButton bg={'red'} color={'white'}>
          Drop
        </StyledMenuButton>
      </StyledOptionsWrapper>
      <StyledList>
        {tables.map((item) => (
          <StyledLi>{item}</StyledLi>
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

export default DatabasesList;
