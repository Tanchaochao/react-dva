const jsonServer = require('json-server');
const path = require('path');
const dbData = require('./db')();

const extractionResults = require('./data/extractionResults');
const imgs = require('./data/imgs');
const sopRules = require('./data/sopRules');

const server = jsonServer.create();
const router = jsonServer.router(dbData);

const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public'), // 设置static目录
});
const rewriter = jsonServer.rewriter({
  '/api/*': '/$1',
});

server.use(middlewares);
server.use(rewriter);
server.put('/sops/:id/setSopQualification', (req, res) => {
  res.json({
    code: 0,
    msg: '',
    data: {},
  });
});
server.post('/sops/:id/reDebug', (req, res) => {
  const data = {
    id: req.params.id,
    extractionResponse: {
      extractionResults,
      imgs,
    },
    sopRules,
  };
  res.json({
    code: 0,
    msg: '',
    data,
  });
});

server.get('/component-metadata/categories', (req, res) => {
  res.json({
    code: 0,
    msg: '',
    data: require('./data/categories'),
  });
});

server.get('/component-metadata/manufacturers', (req, res) => {
  res.json({
    code: 0,
    msg: '',
    data: require('./data/manufacturers'),
  });
});

server.get('/sops/qualified', (req, res) => {
  res.json({
    code: 0,
    msg: '',
    data: require('./data/qualifiedSops'),
  });
});

server.post('/tasks', (req, res) => {
  res.json({
    code: 0,
    msg: '',
    data: {},
  });
});

// 修改请求参数, 比如json_server中_limit表示分页页数
// 可能项目中会取其它的名字pageSize等.
server.use((req, res, next) => {
  // const { pageSize } = req.query;
  // delete req.query.pageSize;
  // pageSize && (req.query._limit = pageSize);
  delete req.query._embed;
  next();
});

// 自定义res格式
router.render = (req, res) => {
  let { data } = res.locals;
  if (Array.isArray(data)) {
    // res.get('X-Total-Count')返回的不是一个字符串, 而是lowdb对象
    // [了解更多](https://github.com/typicode/lowdb)
    let total = res.get('X-Total-Count');
    total = total && total.value();
    data = {
      total,
      list: data,
    };
  }
  res.json({
    code: 0,
    msg: '',
    data,
  });
};

server.use(router);


server.listen(8000, () => {
  // eslint-disable-next-line
  console.log('JSON Server is running on port 8000');
});
