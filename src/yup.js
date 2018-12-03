import * as Yup from 'yup';
import uniq from 'lodash/uniq';

function testArrayUnique(message) {
  return this.test({
    message,
    name: 'unique',
    exclusive: true,
    params: {},
    test(value) {
      return uniq(value).length === value.length;
    },
  });
}
Yup.addMethod(Yup.array, 'unique', testArrayUnique);
