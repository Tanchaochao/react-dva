import axios from 'axios';
import { notification } from 'antd';

export default function request(options) {
  return axios(options)
    .then((response) => {
      return response.data;
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

      }
      throw error;
    });
}
