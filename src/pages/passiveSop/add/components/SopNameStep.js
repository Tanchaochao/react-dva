import React, { PureComponent } from 'react';
import { connect } from 'dva';
import SopNameForm from './SopNameForm';


class SopNameStep extends PureComponent {
  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleSubmit = (values, actions) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'passiveSopAdd/saveSopName',
      payload: values.name,
    })
      .finally(() => {
        if (!this.isUnmounted) {
          actions.setSubmitting(false);
        }
      });
  };

  render() {
    const {
      step,
      stepLength,
      sopName,
    } = this.props;
    return (
      <SopNameForm
        onSubmit={this.handleSubmit}
        step={step}
        stepLength={stepLength}
        initialValues={{ name: sopName.value }}
        errorMessage={sopName.errorMessage}
      />
    );
  }
}


export default connect(({ passiveSopAdd }) => {
  const { sopName } = passiveSopAdd;
  return {
    sopName,
  };
})(SopNameStep);
