import React from 'react';
import { Input, Button, Spin } from 'antd';
import { withFormik, Field } from 'formik';
import withFormItem from '../../../../compoents/inputs/withFormItem';
import Select from '../../../../compoents/inputs/Select';

import {
  required,
  chain,
} from '../../../../validators';
import styles from './Form.m.scss';

const { Option } = Select;
const InputFormItem = withFormItem(Input);
const SelectFormItem = withFormItem(Select);

const Form = (props) => {
  const {
    handleSubmit,
    isSubmitting,
    errorMessage,
    dirty,
    loading,
  } = props;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Spin spinning={isSubmitting || loading}>
        <div className={styles.error}>{errorMessage}</div>
        <Field label="任务名" name="name" component={InputFormItem} validate={chain(required('请输入任务名'))} />
        <Field label="状态" name="status" component={SelectFormItem} validate={chain(required('请输入任务名'))}>
          <Option value="运行中">运行中</Option>
          <Option value="已停止">已停止</Option>
        </Field>
        <div className={styles['btn-wrapper']}>
          <Button htmlType="submit" disabled={isSubmitting || !dirty}>保存</Button>
        </div>

      </Spin>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({ item }) => ({ ...item }),
  handleSubmit: (values, actions) => {
    actions.props.onSubmit(values, actions);
  },
  enableReinitialize: true,
})(Form);
