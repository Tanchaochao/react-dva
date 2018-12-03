import React from 'react';
import {
  Alert, Spin,
} from 'antd';
import { Formik, Form, Field } from 'formik';
import classnames from 'classnames';
import * as Yup from 'yup';
import { InputFormItem } from '@/components/inputs/formItems';
import StepContent from './StepContent';

const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('必填')
    .max(100, '长度100'),
});

const formLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 6,
  },
};

const SopNameForm = (props) => {
  const {
    onCancel,
    onSubmit,
    errorMessage,
    className,
    step,
    stepLength,
    ...other
  } = props;
  return (
    <Formik
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
      validationSchema={schema}
      enableReinitialize
      render={({ isSubmitting, handleSubmit }) => {
        return (
          <Form
            className={classnames('taskForm', className)}
          >
            <StepContent
              current={step}
              stepLength={stepLength}
              onNext={handleSubmit}
            >
              <Spin spinning={isSubmitting}>
                {errorMessage && <Alert message={errorMessage} type="error" />}
                <Field
                  label="sop名称"
                  name="name"
                  placeholder="请输入任务名称"
                  component={InputFormItem}
                  required
                  {...formLayout}
                />
              </Spin>

            </StepContent>
          </Form>
        );
      }}
      {...other}
    />
  );
};

export default SopNameForm;
