import React from 'react';
import { Route, Link } from 'dva/router';
import PropTypes from 'prop-types';

/**
 * 对react-router的NavLink加入path属性, 将to和path分开
 * 以应对子路径匹配
*/
const PathNavLink = (props) => {
  const {
    to,
    path,
    exact,
    strict,
    location,
    activeClassName,
    className,
    activeStyle,
    style,
    isActive: getIsActive,
    ...other
  } = props;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={location}
      children={({ _location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, _location) : match);

        return (
          <Link
            to={to}
            className={
              isActive
                ? [className, activeClassName].filter(i => i).join(' ')
                : className
            }
            style={isActive ? { ...style, ...activeStyle } : style}
            {...other}
          />
        );
      }}
    />
  );
};

PathNavLink.propTypes = {
  to: Link.propTypes.to,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  location: PropTypes.object,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  activeStyle: PropTypes.object,
  style: PropTypes.object,
  isActive: PropTypes.func,
};

PathNavLink.defaultProps = {
  activeClassName: 'active',
};

export default PathNavLink;
