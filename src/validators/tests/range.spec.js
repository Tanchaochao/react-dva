/* global describe, it, expect */
import range from '../range';

describe('range', () => {
  it('should return error message when There is an unmatched character in value with sting paramter', () => {
    expect(range('ab', 'error msg')('ab')).toBe('');
    expect(range('ab', 'error msg')('a')).toBe('');
    expect(range('ab', 'error msg')('abb')).toBe('');
    expect(range('ab', 'error msg')('abc')).toBe('error msg');
  });
  it('should return error message when There is an unmatched character in value with regExp paramter', () => {
    expect(range(/[ab]/, 'error msg')('ab')).toBe('');
    expect(range(/[ab]/, 'error msg')('a')).toBe('');
    expect(range(/[ab]/, 'error msg')('abb')).toBe('');
    expect(range(/[ab]/, 'error msg')('abc')).toBe('error msg');
  });
});
