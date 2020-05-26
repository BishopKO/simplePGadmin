import React, { Component } from 'react';
import { StyledGrants } from './tableCreateStyles';

class TableGrants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grantsList: props.grants,
      grants: { SELECT: false, INSERT: false, UPDATE: false, DELETE: false },
    };
    this.handleChangeGrants = this.handleChangeGrants.bind(this);
  }

  handleChangeGrants = (value) => {
    let tmpState = this.state.grants;
    tmpState[value] = !tmpState[value];
    this.setState({ grants: tmpState });
  };

  createKey = (value, index) => {
    return `${index}_${value}`;
  };

  render() {
    return (
      <StyledGrants label="Grants" width={'230px'}>
        {this.state.grantsList.map((item, index) => (
          <label key={this.createKey(item, index)}>
            <input
              key={this.createKey(item, index)}
              id={item.toLocaleLowerCase()}
              type="checkbox"
              value={item}
              onClick={(element) => this.handleChangeGrants(element.target.value)}
            />
            {item}
          </label>
        ))}
      </StyledGrants>
    );
  }
}

export default TableGrants;
