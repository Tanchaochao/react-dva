import React, { Component } from 'react';

const withInputControl = (InputComponent, initStateValue = '') => {
  return class WrappedComponent extends Component {
    isControlled = this.props.value !== undefined;

    state = {
      value: initStateValue,
    };

    handleChange = (e) => {
      const { value } = e.target;
      if (!this.isControlled) {
        this.setState({
          value,
        });
      }

      if (this.props.onChange) {
        this.props.onChange({
          target: {
            value,
          },
        });
      }
    }

    render() {
      const { value: valueProp, ...other } = this.props;
      const { value: valueState } = this.state;
      const value = this.isControlled ? valueProp : valueState;
      return (
        <InputComponent
          value={value}
          onChange={this.handleChange}
          {...other}
        />
      );
    }
  };
};

export default withInputControl;
