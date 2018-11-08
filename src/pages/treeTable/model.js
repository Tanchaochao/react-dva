// import update from 'immutability-helper';
// import generateSpec from './utils/generateSpec';

const data = [
  {
    id: 1,
    name: 'aa',
    category: 'aa',
    categroyId: 1,
    children: [
      {
        id: 2,
        name: 'bb',
        category: 'bb',
        categroyId: 2,
        children: [
          {
            id: 3,
            name: 'cc',
            category: 'cc',
            categroyId: 3,
          },
        ],
      },
    ],
  },
];

const addPath = (tree, parentPath = []) => {
  for (let i = 0; i < tree.length; i++) {
    const path = [...parentPath, i];
    // eslint-disable-next-line
    tree[i].path = path;
    if (tree[i].children) {
      addPath(tree[i].children, path);
    }
  }
  return tree;
};

export default {
  namespace: 'treeTable',
  state: {
    data: addPath(data),
    editingKey: null,
  },
  reducers: {
    save: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
  effects: {
    * showEditRow({ payload: recordId }, { put }) {
      // const _data = yield select(rootScope => rootScope.treeTable.data);
      // const spec = generateSpec(recordPath, {
      //   editable: { $set: true },
      // });
      // yield put({
      //   type: 'save',
      //   payload: {
      //     data: update(_data, spec),
      //   },
      // });
      yield put({
        type: 'save',
        payload: {
          editingKey: recordId,
        },
      });
    },
  },
};
