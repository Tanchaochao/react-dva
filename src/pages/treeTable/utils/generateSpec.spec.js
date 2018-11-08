/* global describe, it, expect */
import generateSpec from './generateSpec';

describe('generateSpec', () => {
  it('1', () => {
    const path = [0, 0, 0];
    const command = { $set: '1' };
    expect(generateSpec(path, command)).toEqual({
      0: {
        children: {
          0: {
            children: {
              0: { $set: '1' },
            },
          },
        },
      },
    });
  });
});
