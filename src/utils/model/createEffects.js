/* eslint-disable import/no-extraneous-dependencies */
import invariant from 'invariant';
import * as sagaEffects from 'redux-saga/lib/effects';
import warning from 'warning';
import { NAMESPACE_SEP } from 'dva-core/lib/constants';
import prefixType from 'dva-core/lib/prefixType';

/**
 * 复制于[dva createEffects](https://github.com/dvajs/dva/blob/master/packages/dva-core/src/getSaga.js#L92)
 * 为测试model时创建和dva一样的effects函数
 */
function createEffects(model) {
  function assertAction(type, name) {
    invariant(type, 'dispatch: action should be a plain Object with type');
    warning(
      type.indexOf(`${model.namespace}${NAMESPACE_SEP}`) !== 0,
      `[${name}] ${type} should not be prefixed with namespace ${
        model.namespace
      }`,
    );
  }
  function put(action) {
    const { type } = action;
    assertAction(type, 'sagaEffects.put');
    return sagaEffects.put({ ...action, type: prefixType(type, model) });
  }

  // The operator `put` doesn't block waiting the returned promise to resolve.
  // Using `put.resolve` will wait until the promsie resolve/reject before resuming.
  // It will be helpful to organize multi-effects in order,
  // and increase the reusability by seperate the effect in stand-alone pieces.
  // https://github.com/redux-saga/redux-saga/issues/336
  function putResolve(action) {
    const { type } = action;
    assertAction(type, 'sagaEffects.put.resolve');
    return sagaEffects.put.resolve({
      ...action,
      type: prefixType(type, model),
    });
  }
  put.resolve = putResolve;

  function take(type) {
    if (typeof type === 'string') {
      assertAction(type, 'sagaEffects.take');
      return sagaEffects.take(prefixType(type, model));
    } if (Array.isArray(type)) {
      return sagaEffects.take(
        type.map((t) => {
          if (typeof t === 'string') {
            assertAction(t, 'sagaEffects.take');
            return prefixType(t, model);
          }
          return t;
        }),
      );
    }
    return sagaEffects.take(type);
  }
  return { ...sagaEffects, put, take };
}

export default createEffects;
