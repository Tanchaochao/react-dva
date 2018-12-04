import trim from 'lodash/trim';

export default (message) => {
  return (value) => {
    return trim(value) ? '' : (message || '请输入.');
  };
};
