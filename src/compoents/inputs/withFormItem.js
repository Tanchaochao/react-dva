import React from 'react';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import './FormItem.css';

export default InputComponent => (props) => {
  const {
    label,
    field,
    form,
    className: classNameProp,
    ...other
  } = props;

  const error = form.errors[field.name];
  const touched = form.touched[field.name];
  return (
    <Row
      {...other}
      gutter={20}
      className={classnames(classNameProp, 'form-item', {
        'has-error': !!error && touched,
      })}
    >
      <Col span={8}>
        <label className="form-item-label">{label}:</label>
      </Col>
      <Col span={16}>
        <InputComponent id={field.name} {...field} />
      </Col>
      {!!error && touched && (
        <Col span={16} offset={8}>
          <div className="ant-form-explain">{error}</div>
        </Col>
      )}
    </Row>
  );
};
