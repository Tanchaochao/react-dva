import toPath from 'lodash/toPath';
import isArrayPath from './isArrayPath';

export default function SetIn(state, field, value) {
  const path = toPath(field);
  const len = path.length;

  // eslint-disable-next-line no-nested-ternary
  const newtState = isArrayPath((path[0])) ?
    (state == null ? [] : [...state]) :
    (state == null ? {} : { ...state });

  let i = 1;
  let temp = null;
  let parentState = newtState;

  for (; i < len; i++) {
    const isAarryIndex = isArrayPath((path[i]));
    temp = parentState[path[i - 1]];
    // eslint-disable-next-line no-nested-ternary
    parentState[path[i - 1]] = isAarryIndex ?
      (temp == null ? [] : [...temp]) :
      (temp == null ? {} : { ...temp });
    parentState = parentState[path[i - 1]];
  }

  parentState[path[i - 1]] = value;

  return newtState;
}
