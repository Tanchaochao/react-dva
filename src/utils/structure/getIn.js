import toPath from 'lodash/toPath';
import isArray from 'lodash/isArray';

export default function getIn(state, field) {
  const path = toPath(field);
  const len = path.length;

  if (!len) {
    return undefined;
  }

  let result = state;

  for (let i = 0; i < len && result; ++i) {
    const _path = path[i];
    // eslint-disable-next-line
    if (!isNaN(_path) && !isArray(result)) {
      return undefined;
    }
    result = result[_path];
  }

  return result;
}
