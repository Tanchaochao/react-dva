import api from '../../../config/api';
import request from '../../../utils/request';

export const getAccessTasks = (params) => {
  return request({
    url: api.getAccessTasks,
    params,
  });
};

export const getAccessTask = (id) => {
  return request({
    url: `${api.getAccessTask}/${id}`,
  });
};

export const eidtAccessTask = (id, item) => {
  return request({
    method: 'put',
    url: `${api.editAccessTask}/${id}`,
    data: item,
  });
};
