import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import goIcon from 'assets/goIcon.svg';
import IconButton from 'components/atoms/IconButton/IconButton';

const StyledWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 20px 1fr;
  width: 95%;
  height: 150px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 3px; 
  padding: 0;

  ::after {
    position: absolute;
    content: "${({ title }) => title}";
    font-size: 10px;
    top: -12px;
  }
`;

const StyledList = styled.ul`
  height: 100%;
  font-size: 1.2rem;
  list-style: none;
  overflow: auto;
  padding: 0;
  margin-top: 0;
`;

const StyledLi = styled.li`
  padding: 3px 0 0 3px;
  :hover {
    cursor: pointer;
    background: hsl();
  }
  ${({ active }) =>
    active &&
    css`
      background: lightgray;
      border-bottom: 1px solid grey;
    `}
`;

const StyledMenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  align-items: center;
  background: aliceblue;
  width: 100%;
  height: 100%;
`;

const StyledSelect = styled.select`
  font-size: 1rem;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  border-right: 1px solid lightgray;
`;

class OptionsList extends Component {
  constructor({ options, list, title }) {
    super();
    this.state = {
      activeList: null,
      activeOption: options[0].value,
      options,
      list,
      title,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.activeList, this.state.activeOption);
  }

  render() {
    return (
      <StyledWrapper title={this.state.title}>
        <StyledMenuWrapper>
          <StyledSelect onChange={(option) => this.setState({ activeOption: option.target.value })}>
            {this.state.options.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </StyledSelect>
          <IconButton icon={goIcon} />
        </StyledMenuWrapper>
        <StyledList>
          {this.state.list.map((item) => (
            <StyledLi
              onClick={() => this.setState({ activeList: item })}
              active={this.state.activeList === item}
            >
              {item}
            </StyledLi>
          ))}
        </StyledList>
      </StyledWrapper>
    );
  }
}

export default OptionsList;
