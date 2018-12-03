import React from 'react';
import dynamic from 'dva/dynamic';
import { Redirect } from 'dva/router';

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

/* eslint-disable no-unused-vars */
function dynamicWrapper(app, feature, hasModel = true) {
  return dynamic({
    app,
    models: () => {
      return hasModel
        ? [import(`../pages/${feature}/model.js`)]
        : [];
    },
    component: () => import(`../pages/${feature}/${capitalize(feature.split('/').pop())}`),
  });
}

export default function getRouterConfig(app) {
  const routers = [
    {
      path: '/rule/passiveSop',
      exact: true,
      component: () => <Redirect to="/rule/passiveSop/list" />,
    },
    {
      path: '/rule/passiveSop/list',
      exact: true,
      component: dynamicWrapper(app, 'passiveSop/list', false),
    },
  ];
  return routers;
}
