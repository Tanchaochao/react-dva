import React from 'react';
import { Switch, Route } from 'dva/router';


export default function renderRoutes(
  routes,
  extraProps = {},
  switchProps = {},
) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        const RouteComponent = (route.meta && route.meta.Route) || Route;
        return (
          <RouteComponent
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            meta={route.meta}
            render={(props) => {
              const { location } = props;
              return (
                <route.component {...props} {...extraProps} route={route}>
                  {renderRoutes(
                    route.routes,
                    {},
                    {
                      location,
                    },
                  )}
                </route.component>
              );
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}
