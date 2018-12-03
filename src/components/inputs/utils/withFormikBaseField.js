import React from 'react';

const withFormikField = (InputComponent) => {
  return (props) => {
    const {
      field,
      form,
      ...other
    } = props;
    return (
      <InputComponent
        {...field}
        {...other}
      />
    );
  };
};

export default withFormikField;
