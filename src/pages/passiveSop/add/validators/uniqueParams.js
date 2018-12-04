const uniqueParams = (params, index, key = 'cname', message = '中文名称重复') => {
  return (value) => {
    return params.some((p, i) => index !== i && p[key] === value) ? message : '';
  };
};

export default uniqueParams;
