import React from 'react';
import { Switch, Route, Redirect } from 'dva/router';

function renderRoute(route) {
  const { routes: childRoutes, abstract = false } = route;
  const RouteComponent = (route.meta && route.meta.Route) || Route;
  if (!route.component) {
    throw new Error('miss component param in route');
  }
  return (
    <RouteComponent
      key={route.path}
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      meta={route.meta}
      render={(props) => {
        const { location } = props;
        return (
          <route.component
            {...props}
          >
            {childRoutes && (
              <Switch location={location}>
                {childRoutes.map(childRoute => renderRoute(childRoute))}
                {abstract && <Redirect path={route.path} to={childRoutes[0].path} />}
              </Switch>
            )}
          </route.component>
        );
      }}
    />
  );
}

export default function renderRoutes(routes) {
  return (
    <Switch>
      {routes.map(route => renderRoute(route))}
    </Switch>
  );
}
