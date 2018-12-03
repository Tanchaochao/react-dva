import React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

export default InputComponent => (props) => {
  const {
    label,
    colon = true,
    extra,
    hasFeedback = false,
    required = false,
    labelCol,
    wrapperCol,
    field,
    form,
    className: classNameProp,
    ...other
  } = props;
  const error = form.errors[field.name];
  const touched = form.touched[field.name];
  const showError = !!error && touched;
  return (
    <FormItem
      colon={colon}
      label={label}
      extra={extra}
      hasFeedback={hasFeedback}
      help={showError ? error : null}
      required={required}
      validateStatus={showError ? 'error' : null}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      <InputComponent id={field.name} {...field} {...other} />
    </FormItem>
  );
};
