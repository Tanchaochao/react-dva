
const router = require('koa-router')();
const mockjs = require('mockjs');
const handleList = require('../utils/handleList');

const accessData = mockjs.mock({
  'list|100': [
    {
      'id|+1': 1,
      name: /testlw[0-10]{5}/,
      createDate: mockjs.Random.date(),
      'warningCount|0-100': 5,
      status: /(运行中|已停止)/,
    },
  ],
});

let { list } = accessData;

router.get('/', (ctx) => {
  const { query } = ctx;
  ctx.body = {
    code: 0,
    data: {
      total: handleList(list, query)[1],
      list: handleList(list, query)[0],
    },
  };
});
router.put('/:id', (ctx) => {
  const { id } = ctx.params;
  // eslint-disable-next-line eqeqeq
  const index = list.findIndex(item => item.id == id);
  list = [...list.slice(0, index), ctx.body, ...list.slice(index + 1)];
  ctx.body = {
    code: 0,
  };
});
router.get('/:id', (ctx) => {
  const { id } = ctx.params;
  ctx.body = {
    code: 0,
    // eslint-disable-next-line eqeqeq
    data: list.filter(item => item.id == id)[0],
  };
});


module.exports = router;
