export default {
  namespace: 'passiveSopAdd',
  reducers: {
    changeStep(state, { payload: current }) {
      return {
        ...state,
        current,
      };
    },
  },
  state: {
    current: 0,
    stepLength: 3,
    sopName: {},
    sopParams: {},
    sopTables: {},
  },
};
