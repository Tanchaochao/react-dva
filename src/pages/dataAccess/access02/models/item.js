import createItemModel from '../../../../utils/model/createItemModel';
import * as service from '../service';

export default createItemModel({
  namespace: 'access02Item',
  fetchFn: service.getAccessTask,
});
