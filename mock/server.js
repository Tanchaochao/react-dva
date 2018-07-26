const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const logger = require('koa-logger');
const access = require('./routes/access');

const app = new Koa();
const router = Router({ prefix: '/api' });

router.use('/access', access.routes(), access.allowedMethods());

app
  .use(cors())
  .use(logger())
  .use(router.routes());

app.listen(9999);
