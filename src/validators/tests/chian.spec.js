/* global describe, it, jest, expect */
import chain from '../chain';

describe('chian', () => {
  it('when has no errors every validator should be called once width a value paramter', () => {
    const value = 'value';
    const validator1 = jest.fn();
    const validator2 = jest.fn();
    const validator3 = jest.fn();
    const combinedValidator = chain(validator1, validator2, validator3);
    combinedValidator(value);
    expect(validator1.mock.calls.length).toBe(1);
    expect(validator2.mock.calls.length).toBe(1);
    expect(validator3.mock.calls.length).toBe(1);
    expect(validator1.mock.calls[0][0]).toBe(value);
    expect(validator2.mock.calls[0][0]).toBe(value);
    expect(validator3.mock.calls[0][0]).toBe(value);
  });
  it('when error occur, the follow validators should not be called', () => {
    const value = 'value';
    const validator1 = jest.fn();
    const validator2 = jest.fn().mockReturnValue('some error');
    const validator3 = jest.fn();
    const combinedValidator = chain(validator1, validator2, validator3);
    const error = combinedValidator(value);
    expect(validator1.mock.calls.length).toBe(1);
    expect(validator2.mock.calls.length).toBe(1);
    expect(validator3.mock.calls.length).toBe(0);
    expect(error).toBe('some error');
  });
});
