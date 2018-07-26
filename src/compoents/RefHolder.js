import React from 'react';
import PropTypes from 'prop-types';

/**
 * 复制于[](https://github.com/mui-org/material-ui/blob/v1-beta/src/internal/RefHolder.js)
 */
class RefHolder extends React.Component {
  render() {
    return this.props.children;
  }
}

RefHolder.propTypes = {
  children: PropTypes.node,
};

export default RefHolder;
