/* global describe, it, expect */
import required from '../required';

describe('required', () => {
  it('it should return \'\' when value is not null', () => {
    const value = 'some';
    const result = required()(value);
    expect(result).toBe('');
  });
  it('it should return default error message when message param is not set', () => {
    const value = '';
    const result = required()(value);
    expect(result).toBe('请输入.');
  });
  it('it should return set error message when message param is set', () => {
    const value = '';
    const result = required('请输入username.')(value);
    expect(result).toBe('请输入username.');
  });
});
