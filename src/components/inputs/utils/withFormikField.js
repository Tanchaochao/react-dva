import React from 'react';
import classnames from 'classnames';
import { getIn } from '@/utils/structure';

export default InputComponent => (props) => {
  const {
    field,
    form,
    className: classNameProp,
    ...other
  } = props;
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  return (
    <div
      className={classnames(classNameProp, 'ant-form-item-control', {
        'has-error': !!error && touched,
      })}
    >
      <InputComponent id={field.name} {...field} {...other} />
      {
        !!error && touched
        && (
          <div className="ant-form-explain">{error}</div>
        )
      }
    </div>
  );
};
