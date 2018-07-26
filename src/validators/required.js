export default (message) => {
  return (value) => {
    return value ? '' : (message || '请输入.');
  };
};
