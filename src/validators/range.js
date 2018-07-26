export default (range, message) => {
  return (value) => {
    for (let i = 0; i < value.length; i++) {
      if (typeof (range) === 'string') {
        if (range.indexOf(value[i]) === -1) {
          return message;
        }
      } else if (range instanceof RegExp) {
        if (!range.test(value[i])) {
          return message;
        }
      } else {
        throw new Error(`range paramer: ${range} is not string or regExp`);
      }
    }
    return '';
  };
};
