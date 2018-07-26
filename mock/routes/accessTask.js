
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
      status: /[运行中|已停止]/,
    },
  ],
});

const { list } = accessData;

router.get('/', (ctx) => {
  const { query } = ctx;
  ctx.body = {
    code: 0,
    data: {
      total: list.length,
      list: handleList(list, query),
    },
  };
});
router.post('/', (ctx) => {
  ctx.body = 'this a users response!';
});
router.get('/{id}', (ctx) => {
  ctx.body = 'this a users response!';
});


module.exports = router;
