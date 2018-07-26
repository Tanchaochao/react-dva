import React, { PureComponent } from 'react';
import { Select } from 'antd';


class SelectC extends PureComponent {
  handleChange = (value) => {
    const { onChange, name } = this.props;
    onChange && onChange({
      target: {
        value,
        // https://github.com/jaredpalmer/formik#handlechange-e-reactchangeeventany--void
        // formik onChange方法 是根据input元素的name或id来区分字段的, 所以需要指定
        name,
      },
    });
  }

  handleBlur = (value) => {
    const { onBlur, name } = this.props;
    onBlur && onBlur({
      target: {
        value,
        name,
      },
    });
  }

  render() {
    const {
      children,
      onChange,
      onBlur,
      name,
      ...other
    } = this.props;
    return (
      <Select
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        name={name}
        {...other}
      >
        {children}
      </Select>
    );
  }
}


SelectC.Option = Select.Option;

export default SelectC;
