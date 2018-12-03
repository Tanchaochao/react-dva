import React from 'react';
import PropTypes from 'prop-types';

import layoutConfig from '@/config/layout';
import BasicLayout from './BasicLayout';

class RootLayout extends React.PureComponent {
  render() {
    let LayoutComponent = null;
    const { location: { pathname } } = this.props;
    for (let i = 0, len = layoutConfig.length; i < len; i++) {
      const item = layoutConfig[i];
      if (item.test.test(pathname)) {
        LayoutComponent = item.layout;
        break;
      }
    }

    LayoutComponent = LayoutComponent || BasicLayout;

    return <LayoutComponent {...this.props} />;
  }
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default RootLayout;
