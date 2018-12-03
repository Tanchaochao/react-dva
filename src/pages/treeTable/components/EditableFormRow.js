import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import RefHolder from '../../../compoents/RefHolder';

function EditableRow(props) {
  const { form, ...other } = props;
  return (
    <tr {...other} />
  );
}

function EditableFormRow(props) {
  const { record, onSubmit, ...other } = props;
  return (
    <Formik
      initialValues={{ ...record }}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      render={_props => <EditableRow form={_props} {...other} />}
      enableReinitialize
    />
  );
}

function AddableRow(props) {
  const {
    form,
    colCount,
    extraChildren,
    ...other
  } = props;
  return (
    <RefHolder>
      <tr {...other} />
      <tr colSpan={colCount}>
        <p>
          {/* 额外的input */}
          {extraChildren}

        </p>
      </tr>
    </RefHolder>
  );
}

function AddableFormRow(props) {
  const { record, onSubmit, ...other } = props;
  return (
    <Formik
      initialValues={{ ...record }}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      render={_props => <AddableRow form={_props} {...other} />}
      enableReinitialize
    />
  );
}

class Temp extends Component {
  render() {
    const { table } = this.context;
    const colCount = table.columnManager.leafColumns().length;
    const extraChildren = [
      <Field name="id" component="input" />,
    ];
    return this.props.record.id !== 'add'
      ? <EditableFormRow {...this.props} />
      : <AddableFormRow {...this.props} colCount={colCount} extraChildren={extraChildren} />;
  }
}

Temp.contextTypes = {
  table: PropTypes.object,
};

export default Temp;
