import React from 'react';
import {
  Alert, Spin, Button, Icon,
} from 'antd';
import {
  Formik, Form, Field, FieldArray,
} from 'formik';
import classnames from 'classnames';
import * as Yup from 'yup';
import { InputField } from '@/components/inputs/formFields';
import StepContent from './StepContent';
import uniqueParams from '../validators/uniqueParams';
import './SopParamsForm.css';

const schema = Yup.object().shape({
  params: Yup.array()
    .of(
      Yup.object()
        .shape({
          cname: Yup.string()
            .trim()
            .required('必填'),
          ename: Yup.string()
            .trim()
            .required('必填'),
        }),
    )
    .required('不能为空'),
});

const SopParamsForm = (props) => {
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
      render={({ isSubmitting, handleSubmit, values }) => {
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
                <FieldArray
                  name="params"
                  render={({ insert, remove, swap }) => {
                    return (
                      <div>
                        {values.params.map((_, index) => {
                          return (
                            <div key={index} className="sopParamsForm__line">
                              <Field
                                className="sopParamsForm__input"
                                name={`params[${index}].cname`}
                                component={InputField}
                                validate={uniqueParams(values.params, index)}
                              />
                              <Field
                                className="sopParamsForm__input"
                                name={`params[${index}].ename`}
                                component={InputField}
                                validate={uniqueParams(values.params, index, 'ename', '英文名称重复')}
                              />
                              {index !== 0 && <Button onClick={() => remove(index)}><Icon type="minus" /></Button>}
                              <Button onClick={() => insert(index + 1, { cname: '', ename: '' })}><Icon type="plus" /></Button>
                              {index !== 0 && <Button onClick={() => swap(index, index - 1)}><Icon type="arrow-up" /></Button>}
                              {index < values.params.length - 1 && <Button onClick={() => swap(index, index + 1)}><Icon type="arrow-down" /></Button>}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
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

export default SopParamsForm;
