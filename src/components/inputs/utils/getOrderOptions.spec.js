/* global describe, it, expect */
import getOrderOptions from './getOrderOptions';

describe('getOrderOptions', () => {
  const options = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' },
  ];
  it('顺序选择', () => {
    const value = ['a', 'b'];
    expect(getOrderOptions(options, value)).toEqual([
      { value: 'a', label: 'a', order: 1 },
      { value: 'b', label: 'b', order: 2 },
      { value: 'c', label: 'c', order: null },
    ]);
  });
  it('顺序选择中间间断', () => {
    const value = ['a', 'c'];
    expect(getOrderOptions(options, value)).toEqual([
      { value: 'a', label: 'a', order: 1 },
      { value: 'b', label: 'b', order: null },
      { value: 'c', label: 'c', order: 2 },
    ]);
  });
  it('倒序选择', () => {
    const value = ['c', 'b'];
    expect(getOrderOptions(options, value)).toEqual([
      { value: 'a', label: 'a', order: null },
      { value: 'b', label: 'b', order: 2 },
      { value: 'c', label: 'c', order: 1 },
    ]);
  });
  it('倒序选择2', () => {
    const value = ['b', 'c'];
    expect(getOrderOptions(options, value)).toEqual([
      { value: 'a', label: 'a', order: null },
      { value: 'b', label: 'b', order: 1 },
      { value: 'c', label: 'c', order: 2 },
    ]);
  });
  it('杂乱选择', () => {
    const value = ['c', 'a', 'b'];
    expect(getOrderOptions(options, value)).toEqual([
      { value: 'a', label: 'a', order: 2 },
      { value: 'b', label: 'b', order: 3 },
      { value: 'c', label: 'c', order: 1 },
    ]);
  });
});
