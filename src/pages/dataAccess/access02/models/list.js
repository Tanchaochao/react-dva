import createListModel from '../../../../utils/model/createListModel';
import * as service from '../service';

export default {
  ...createListModel({
    namespace: 'access02List',
    fetchListFn: service.getAccessTasks,
    pageSize: 10,
  }),
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/dataAccess/access02') {
          dispatch({
            type: 'fetchList',
          });
        }
      });
    },
  },
};
