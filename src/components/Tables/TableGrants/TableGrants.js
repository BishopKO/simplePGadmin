import React, { Component } from "react";
import { StyledGrants } from "../TableCreate/tableCreateStyles";
import createKey from "helpers/genReactKey";

class TableGrants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grants: { SELECT: true, INSERT: true, UPDATE: true, DELETE: true }
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
      <StyledGrants label="Grants" width={"230px"}>
        {Object.entries(this.state.grants).map(([key, value], index) => (
          <label key="table_grants">
            <input
              key={createKey("grant", index)}
              type="checkbox"
              checked={value}
              onClick={(element) => this.handleChangeGrants(key)}
            />
            {key}
          </label>
        ))}
      </StyledGrants>
    );
  }
}

export default TableGrants;
