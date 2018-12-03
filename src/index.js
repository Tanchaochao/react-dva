import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createHashHistory';
import './yup';

// eslint-disable-next-line no-unused-vars
import registerServiceWorker from './registerServiceWorker';

import './styles/index.less';

const app = dva({
  history: createHistory(),
  // 加入全局错误处理, dva effect中发生错误会影响其他的effect, 其他effect不会触发
  onError: (e) => {
    // eslint-disable-next-line no-console
    console.log(e);
  },
});

app.use(createLoading());
app.model(require('./models/global').default);
app.router(require('./router').default);

app.start('#root');

// eslint-disable-next-line
window.app = app;

export default app;
