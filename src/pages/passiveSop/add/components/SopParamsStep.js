import React, { PureComponent } from 'react';
import { connect } from 'dva';
import SopParamsForm from './SopParamsForm';

class SopParamsStep extends PureComponent {
  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleSubmit = (values, actions) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'passiveSopAdd/saveSopParams',
      payload: values.params,
    })
      .finally(() => {
        if (!this.isUnmounted) {
          actions.setSubmitting(false);
        }
      });
  }

  render() {
    const {
      step,
      stepLength,
      sopParams,
    } = this.props;
    return (
      <SopParamsForm
        onSubmit={this.handleSubmit}
        step={step}
        stepLength={stepLength}
        initialValues={{ params: sopParams.value }}
        errorMessage={sopParams.errorMessage}
      />
    );
  }
}

export default connect(({ passiveSopAdd }) => {
  const { sopParams } = passiveSopAdd;
  return {
    sopParams,
  };
})(SopParamsStep);
