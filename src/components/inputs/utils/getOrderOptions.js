const getOrderOptions = (options, value) => {
  const newOptions = [...options];
  for (let i = 0, len = newOptions.length; i < len; i++) {
    const index = value.indexOf(newOptions[i].value);
    newOptions[i].order = index === -1 ? null : index + 1;
  }
  return newOptions;
};

export default getOrderOptions;
