import { setIn, getIn } from 'formik';
import { delay } from 'dva/saga';

export default {
  namespace: 'passiveSopAdd',
  state: {
    current: 0,
    stepLength: 3,
    sopName: {
      value: '',
      errorMessage: null,
    },
    sopParams: {},
    sopTables: {},
  },
  reducers: {
    changeStep(state, { payload: current }) {
      return {
        ...state,
        current,
      };
    },
    saveByPath(state, action) {
      const { meta: path, payload: data } = action;
      const oldData = getIn(state, path);
      const newData = {
        ...oldData,
        ...data,
      };
      return setIn(state, path, newData);
    },
  },
  effects: {
    * saveSopName({ payload: name }, { call, put, select }) {
      const current = yield select(rootState => rootState.passiveSopAdd.current);
      yield call(delay, 1000);

      // 正确
      yield put({
        type: 'saveByPath',
        meta: 'sopName',
        payload: {
          value: name,
        },
      });
      yield put({
        type: 'changeStep',
        payload: current + 1,
      });

      // 错误
      // yield put({
      //   type: 'saveByPath',
      //   meta: 'sopName',
      //   payload: {
      //     errorMessage: '出错',
      //   },
      // });
    },
  },
};
