import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import goIcon from 'assets/goIcon.svg';
import IconButton from 'components/atoms/IconButton/IconButton';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import { connect } from 'react-redux';
import { getTablesAction } from 'actions';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`  
  display: grid;
  grid-template-rows: 30px 1fr;
  width: 100%;
  height: 270px;
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

  li {
    border-bottom: 0.5px solid grey;
  }
`;

const StyledLi = styled.li`
  padding: 3px 0 0 3px;
  :hover {
    cursor: pointer;
    background: lightgray;
  }
  ${({ active }) =>
    active &&
    css`
      background: grey;
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
  font-size: 1.2rem;
  width: 90%;
  height: 100%;
  border: none;
  background: none;
  border-right: 1px solid lightgray;
`;

const StyledGoButton = styled(IconButton)`
  width: 30px;
  height: 30px;
`;

const StyledBorder = styled(BorderWithLabel)`
  height: 100%;
  width: 100%;
  padding: 5px;
  ::after {
    font-size: 13px;
    top: -10px;
    height: 13px;
  }
`;

class OptionsList extends Component {
  constructor({ options, type, list }) {
    super();
    this.state = {
      activeOption: options[0].value,
      activeList: list[0],
      type,
    };
    this.createPathname = this.createPathname.bind(this);
  }

  createPathname() {
    return ['', this.state.activeOption, this.state.activeList].join('/');
  }

  createKey(value, index) {
    return `${index}_${value}`;
  }

  componentDidUpdate() {
    const { getDatabaseTables, config, loggedIn } = this.props;
    if (this.state.type === 'databases' && loggedIn && this.state.activeList) {
      console.log(this.state.activeList);
      config.database = this.state.activeList;
      console.log(config);
      getDatabaseTables(config);
    }
  }

  render() {
    const { options, label, list, tables } = this.props;
    return (
      <StyledBorder label={label}>
        <StyledWrapper>
          <StyledMenuWrapper>
            <StyledSelect
              className="options"
              onChange={(opt) => this.setState({ activeOption: opt.target.value })}
            >
              {options.map((item, index) => (
                <option key={this.createKey(item, index)} value={item.value}>
                  {item.name}
                </option>
              ))}
            </StyledSelect>
            <StyledGoButton as={Link} to={this.createPathname} icon={goIcon} />
          </StyledMenuWrapper>

          <StyledList>
            {this.state.type === 'databases' &&
              list.map((item, index) => (
                <StyledLi
                  key={this.createKey(item, index)}
                  onClick={() => this.setState({ activeList: item })}
                  active={this.state.activeList === item}
                >
                  {item}
                </StyledLi>
              ))}
          </StyledList>

          <StyledList>
            {this.state.type === 'tables' &&
              tables.map((item, index) => (
                <StyledLi
                  key={this.createKey(item, index)}
                  onClick={() => this.setState({ activeList: item })}
                  active={this.state.activeList === item}
                >
                  {item}
                </StyledLi>
              ))}
          </StyledList>
        </StyledWrapper>
      </StyledBorder>
    );
  }
}

const mapStateToProps = (state) => {
  const { config, loggedIn, tables } = state;
  return { config, loggedIn, tables };
};

const mapDispatchToProps = (dispatch) => ({
  getDatabaseTables: (databaseName) => dispatch(getTablesAction(databaseName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList);
