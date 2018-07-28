const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const accessTask = require('./routes/accessTask');

const app = new Koa();
const router = Router({ prefix: '/api' });

router.use('/accessTasks', accessTask.routes(), accessTask.allowedMethods());

app
  .use(cors())
  .use(logger())
  .use(koaBody())
  .use(router.routes());

app.listen(9999);
