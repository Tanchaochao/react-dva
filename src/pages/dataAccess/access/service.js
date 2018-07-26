import api from '../../../config/api';
import request from '../../../utils/request';

export const getAccessTasks = (params) => {
  return request({
    url: api.getAccessTasks,
    params,
  });
};
