import React, { Component } from 'react';
import { Checkbox } from 'antd';
import uuidv1 from 'uuid/v1';
import classnames from 'classnames';
import getOrderOptions from './utils/getOrderOptions';
import './OrderCheckBox.scss';

class OrderCheckBox extends Component {
  uid = uuidv1();

  handleChange = (v, e) => {
    const { value, onChange, name } = this.props;
    const { checked } = e.target;
    let newValue;

    if (checked) {
      newValue = [...value, v];
    } else {
      const i = value.indexOf(v);
      newValue = [...value.slice(0, i), ...value.slice(i + 1)];
    }

    onChange({
      target: {
        value: newValue,
        name,
      },
    });
  }

  render() {
    const { options, value } = this.props;
    const orderOptions = getOrderOptions(options, value);
    return (
      <div className="orderSelect">
        {orderOptions.map((option, i) => {
          return (
            <label htmlFor={`${this.uid}-${i}`} className="orderSelect__item" key={i}>
              {option.order && <span className="orderSelect__order">{option.order}</span>}
              <Checkbox className={classnames('orderSelect__control', { hidden: !!option.order })} id={`${this.uid}-${i}`} checked={option.order != null} onChange={this.handleChange.bind(null, option.value)} />
              <span className="orderSelect__label">{option.label}</span>
            </label>

          );
        })}
      </div>
    );
  }
}

export default OrderCheckBox;
