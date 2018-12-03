import React from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { withRouter, routerRedux } from 'dva/router';
import RootLayout from './layouts/RootLayout';
import getRouterConfig from './config/router';
import renderRoutes from './utils/renderRoutes';

const { ConnectedRouter } = routerRedux;
const RouteredRootLayout = withRouter(RootLayout);

export default function ({ app, history }) {
  const routes = getRouterConfig(app);
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <RouteredRootLayout>
          {renderRoutes(routes)}
        </RouteredRootLayout>
      </ConnectedRouter>
    </LocaleProvider>
  );
}
