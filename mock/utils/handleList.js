const handleList = (list, query) => {
  const {
    limit = 10,
    page = 1,
    sort,
    order = 'asc',
  } = query;
  const _list = list.slice((page - 1) * limit, page * limit);

  if (sort) {
    if (order === 'asc') {
      _list.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    } else {
      _list.sort((a, b) => (a[sort] < b[sort] ? 1 : -1));
    }
  }
  return _list;
};

module.exports = handleList;
