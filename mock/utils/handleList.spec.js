/* global describe, it, expect */
const handleList = require('./handleList');

describe('handleList', () => {
  it('it will corret handle paganation', () => {
    const list = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ];
    expect(handleList(list, { page: 1, limit: 2 })).toEqual([{ id: 1 }, { id: 2 }]);
    expect(handleList(list, { page: 2, limit: 2 })).toEqual([{ id: 3 }, { id: 4 }]);
    expect(handleList(list, { page: 3, limit: 2 })).toEqual([{ id: 5 }, { id: 6 }]);
    expect(handleList(list, { page: 4, limit: 2 })).toEqual([]);
  });
  it('it  will corret handle sort', () => {
    const list = [
      { id: '3' },
      { id: '2' },
      { id: '3' },
    ];
    expect(handleList(list, { sort: 'id' })).toEqual([{ id: '2' }, { id: '3' }, { id: '3' }]);
    expect(handleList(list, { sort: 'id', order: 'asc' })).toEqual([{ id: '2' }, { id: '3' }, { id: '3' }]);
    expect(handleList(list, { sort: 'id', order: 'dsc' })).toEqual([{ id: '3' }, { id: '3' }, { id: '2' }]);
  });
});
