import React from 'react';
import { Formik } from 'formik';

function EditableRow(props) {
  const { form, ...other } = props;
  return (
    <tr {...other} />
  );
}

export default (props) => {
  const { record, onSubmit, ...other } = props;
  return (
    <Formik
      initialValues={{ ...record }}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      render={_props => <EditableRow form={_props} {...other} />}
      enableReinitialize
    />
  );
};
