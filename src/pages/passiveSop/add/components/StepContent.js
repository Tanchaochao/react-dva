import React from 'react';
import { Button } from 'antd';
import app from '@/index';

const { dispatch } = app._store;

const handleNext = (current) => {
  dispatch({
    type: 'passiveSopAdd/changeStep',
    payload: current + 1,
  });
};


const handlePrev = (current) => {
  dispatch({
    type: 'passiveSopAdd/changeStep',
    payload: current - 1,
  });
};


export default (props) => {
  const {
    children,
    current,
    stepLength,
    onNext = handleNext.bind(null, current),
    onPrev = handlePrev.bind(null, current),
    onDone,
    ...other
  } = props;
  return (
    <div
      {...other}
    >
      {children}
      <div>
        1111
        {current > 0 && <Button onClick={onPrev}>上一步</Button>}
        {current < stepLength - 1 && <Button onClick={onNext}>下一步</Button>}
        {current === stepLength - 1 && <Button onClick={onDone}>完成</Button>}
      </div>
    </div>
  );
};
