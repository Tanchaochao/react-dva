import dynamic from 'dva/dynamic';

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
    component: () => import(`../pages/${feature}/${capitalize(feature)}`),
  });
}

export default function getRouterConfig(app) {
  const routers = [
    {
      path: '/',
      exact: true,
      component: dynamicWrapper(app, 'home', false),
    },
  ];
  return routers;
}
