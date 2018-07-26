
const router = require('koa-router')();

router.get('/', (ctx) => {
  ctx.body = 'this a users response!';
});

module.exports = router;
