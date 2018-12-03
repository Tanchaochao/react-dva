import React, { Component } from 'react';
import { connect } from 'dva';
import SopNameStep from './components/SopNameStep';
import SopParamsStep from './components/SopParamsStep';
import SopTablesStep from './components/SopTablesStep';

class PassiveSopAdd extends Component {
  render() {
    const { passiveSopAdd } = this.props;
    const { current, stepLength } = passiveSopAdd;
    return (
      <div>
        {current === 0 && <SopNameStep step={0} stepLength={stepLength} />}
        {current === 1 && <SopParamsStep step={1} stepLength={stepLength} />}
        {current === 2 && <SopTablesStep step={2} stepLength={stepLength} />}
      </div>
    );
  }
}

export default connect(({ passiveSopAdd }) => {
  return {
    passiveSopAdd,
  };
})(PassiveSopAdd);
