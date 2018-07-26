import { notification } from 'antd';
import * as service from './service';

export default {
  namespace: 'access',
  state: {
    list: [],
    total: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * fetchList({ payload }, { put, call }) {
      const result = yield call(service.getAccessTasks, payload);
      if (result.code === 0) {
        yield put({
          type: 'save',
          payload: {
            list: result.data.list,
            total: result.data.total,
          },
        });
      } else {
        notification.error({ message: `请求出错: ${result.msg}` });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/dataAccess/access') {
          dispatch({
            type: 'fetchList',
          });
        }
      });
    },
  },
};
