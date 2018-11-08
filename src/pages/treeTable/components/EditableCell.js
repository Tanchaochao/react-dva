import React from 'react';
import { Field } from 'formik';

const EditableCell = (props) => {
  const {
    field, dataIndex, children, editing, index, ...other
  } = props;
  return (
    <td {...other}>
      {editing && index === 0 && children.slice(0, 2)}
      {editing && <Field name={field.dataIndex || dataIndex} {...field} />}
      {!editing && children}
    </td>
  );
};

export default EditableCell;
