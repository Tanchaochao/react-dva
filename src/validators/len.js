export default (len, message) => {
  return (value) => {
    return len === value.length ? '' : (message || `长度应为${len}`);
  };
};
