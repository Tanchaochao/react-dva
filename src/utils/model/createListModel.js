import { notification } from 'antd';
import save from './saveReducer';

export default (options) => {
  const { namespace, fetchListFn, pageSize } = options;
  return {
    namespace,
    state: {
      list: [],
      total: 0,
      page: 1,
      filters: {},
      pageSize,
    },
    reducers: {
      save,
    },
    effects: {
      * fetchList(_, { call, put, select }) {
        const state = yield select(rootState => rootState[namespace]);
        const params = {
          limit: state.pageSize,
          page: state.page,
          ...state.filters,
        };
        const result = yield call(fetchListFn, params);
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
      * changePage({ payload }, { put }) {
        yield put({
          type: 'save',
          payload: {
            page: payload,
          },
        });
        yield put({ type: 'fetchList' });
      },
      * changeFilter({ payload }, { put, select }) {
        const filters = yield select(rootState => rootState[namespace].filters);
        yield put({
          type: 'save',
          payload: {
            page: 1,
            filters: {
              ...filters,
              ...payload,
            },
          },
        });
        yield put({ type: 'fetchList' });
      },
    },
  };
};
