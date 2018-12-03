import React from 'react';
import { FieldArray, ErrorMessage } from 'formik';
import isFunction from 'lodash/isFunction';
import { Icon, Button } from 'antd';
import { getIn } from '@/utils/structure';
import RefHolder from '../RefHolder';
import './CommonFieldArray.css';

const CommonFieldArray = (props) => {
  const fieldArrayRender = ({
    name, form, push, remove,
  }) => {
    const { values } = form;
    const value = getIn(values, name) || [];
    return (
      <RefHolder>
        <ErrorMessage name={name} render={msg => typeof msg === 'string' && <div className="commonFieldArray__error">{msg}</div>} />
        {value.map((_, index) => {
          return (
            <div key={index} className="commonFieldArray__item">
              {isFunction(label) ? label({ index, className: 'commonFieldArray__label' }) : label}
              {isFunction(field) ? field({ name, index, className: 'commonFieldArray__field' }) : field}
              <div className="commonFieldArray__del">
                {
                  (index !== 0 || enableDelFirstLine) &&
                  <Icon type="close" theme="outlined" onClick={() => remove(index)} />
                }
              </div>
            </div>
          );
        })}
        <Button type="button" onClick={() => push(initValue)} className="commonFieldArray__add">
          <Icon type="plus" theme="outlined" />
        </Button>
      </RefHolder>
    );
  };

  const {
    name, label, field, initValue = '',
    enableDelFirstLine = false,
  } = props;
  return (
    <FieldArray
      render={fieldArrayRender}
      name={name}
    />
  );
};

export default CommonFieldArray;
