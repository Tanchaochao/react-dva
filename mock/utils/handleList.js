const handleList = (list, query) => {
  const {
    limit = 10,
    page = 1,
    sort,
    order = 'asc',
    ...filters
  } = query;
  const filterKeys = Object.keys(filters);
  let _list = list;
  if (filterKeys.length !== 0) {
    filterKeys.forEach((key) => {
      if (filters[key]) {
        _list = _list.filter(item => item[key].indexOf(filters[key]) !== -1);
      }
    });
  }
  const total = _list.length;
  _list = _list.slice((page - 1) * limit, page * limit);

  if (sort) {
    if (order === 'asc') {
      _list.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    } else {
      _list.sort((a, b) => (a[sort] < b[sort] ? 1 : -1));
    }
  }
  return [_list, total];
};

module.exports = handleList;
