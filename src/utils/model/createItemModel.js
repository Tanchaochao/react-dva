import { notification } from 'antd';
import { delay } from 'dva/saga';
import save from './saveReducer';

export default (options) => {
  const { namespace, fetchFn } = options;
  return {
    namespace,
    state: {
      item: null,
    },
    reducers: {
      save,
    },
    effects: {
      * fetch({ payload }, { put, call }) {
        yield delay(1000);
        const result = yield call(fetchFn, payload);
        if (result.code === 0) {
          yield put({
            type: 'save',
            payload: {
              item: result.data,
            },
          });
        } else {
          notification.error({ message: `请求出错: ${result.msg}` });
          yield put({
            type: 'save',
            payload: {
              item: null,
            },
          });
        }
      },
    },
  };
};
