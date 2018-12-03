import React from 'react';
import StepContent from './StepContent';

export default (props) => {
  const {
    step,
    stepLength,
  } = props;
  return (
    <StepContent
      current={step}
      stepLength={stepLength}
    >
      <div>
      SopParamsStep
      </div>
    </StepContent>
  );
};
