import React from 'react';
import PropTypes from 'prop-types';

import BasicLayout from './BasicLayout';

class RootLayout extends React.PureComponent {
  render() {
    return <BasicLayout {...this.props} />;
  }
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default RootLayout;
