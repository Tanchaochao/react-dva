export default (...validators) => (value) => {
  for (let i = 0; i < validators.length; i++) {
    const error = validators[i](value);
    if (error) {
      return error;
    }
  }
  return '';
};
