import config from '@/config/common';
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
      pendingFilters: {},
      pageSize: pageSize || config.pageSize,
    },
    reducers: {
      save,
      changePendingFilter(state, { payload }) {
        let { pendingFilters } = state;
        pendingFilters = {
          ...pendingFilters,
          ...payload,
        };
        return {
          ...state,
          pendingFilters,
        };
      },
    },
    effects: {
      * fetchList(_, { call, put, select }) {
        const state = yield select(rootState => rootState[namespace]);
        const filters = { ...state.filters };
        Object.keys(filters).forEach((key) => {
          if (!filters[key] && filters[key] !== 0) {
            delete filters[key];
          }
        });
        const params = {
          _limit: state.pageSize,
          _page: state.page,
          ...filters,
        };
        try {
          const data = yield call(fetchListFn, params);
          yield put({
            type: 'save',
            payload: {
              list: data.list,
              total: data.total,
            },
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
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
