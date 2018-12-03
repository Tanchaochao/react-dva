import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

export default function request(options) {
  const defaultOptions = {
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };
  const newOptions = {
    ...defaultOptions,
    ...options,
  };
  return axios(newOptions)
    .then((response) => {
      const result = response.data;
      if (result.code === 0) {
        return result.data;
      }
      const error = new Error();
      error.message = result.msg;
      throw error;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        notification.error({
          message: `请求错误 ${error.response.status}: ${error.config.url}`,
          description: error.response.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        notification.error({
          message: '请求错误, 没有响应',
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        notification.error({ message: `请求出错: ${error.message}` });
      }
      throw error;
    });
}
