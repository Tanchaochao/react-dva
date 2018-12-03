import React, { Component } from 'react';
import { NavLink } from 'dva/router';

class PassiveSopList extends Component {
  render() {
    return (
      <div>
        <NavLink to="/rule/passiveSop/add">
          增加
        </NavLink>
      </div>
    );
  }
}

export default PassiveSopList;
