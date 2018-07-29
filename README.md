# React-dva

## 主要依赖

- "antd": "^3.7.0"
- "axios": "^0.18.0"
- "dva": "^2.3.1"
- "formik": "^1.0.1"
- "koa": "^2.5.2" 用于mock server

## 快速开始

克隆项目文件:

```
git clone https://gitlab.com/lulupy/react-dva.git
```

进入目录安装依赖:

```
# 推荐使用yarn
npm i 或者 yarn install
```

开发：

```
npm start
```

本地访问地址: http://localhost:3000

启动mock server:

```
npm run mock
```

mock sever地址: http://localhost:9999




## 项目结构

```
src
├── compoents # UI组件及UI相关方法
├── config # 配置文件
│   ├── api.js # api地址的配置
│   ├── common.js # 通用配置
│   └── router.js # 路由配置
├── index.js # 入口文件
├── layouts # 布局组件
│   ├── BasicLayout.js # 通用布局组件
│   ├── BasicLayout.m.scss
│   └── RootLayout.js # 入口布局组件
├── models # 全局models
│   ├── global.js
│   └── global.spec.js
├── pages # 路由组件
│   ├── dataAccess
│   │   ├── access
│   │   └── access02
│   └── home
│       └── Home.js
├── router.js # 路由组件入口
├── styles
│   ├── antd-custom-theme.less # 修改antd默认样式
│   └── index.less # 全局样式
├── utils # 工具函数
│   ├── model # model相关工具函数
│   │   ├── createItemModel.js # 通用列表工厂函数
│   │   ├── createListModel.js # 通用item工厂函数
│   │   └── saveReducer.js
│   ├── renderRoutes.js # 根据routerConfig渲染路由组件
│   └── request.js # api请求函数
└── validators # form验证函数

```


## eslint

基于[eslint-config-airbnb@17.0.0](https://www.npmjs.com/package/eslint-config-airbnb)

修改如下:

```
"react/jsx-filename-extension": "off",
"react/forbid-prop-types": "off",
"react/prop-types": "off",
"global-require": "off",
"no-use-before-define": "off",
"consistent-return": "off",
"react/prefer-stateless-function": "off",
"jsx-a11y/label-has-for": "off",
"react/jsx-one-expression-per-line": "off",
"import/prefer-default-export": "off",
"react/destructuring-assignment": "off",
"arrow-body-style": "off",
"no-plusplus": "off",
"react/require-default-props": "off",
"react/no-children-prop": "off",
"react/jsx-no-bind": "off",
"no-throw-literal": "off",
"no-underscore-dangle": "off",
"no-unused-expressions": "off",
"react/sort-comp": ["error", {
  "order": [
    "static-methods",
    "instance-variables",
    "lifecycle",
    "/^handle.+$/",
    "getters",
    "setters",
    "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
    "instance-methods",
    "everything-else",
    "rendering"
  ]
}]
}
```

## style

- 支持less
- 支持scss
- 支持css module

### css module

文件为`*.m.css`或`*.m.scss`， 对其使用css module


## 命名规范

1. 一个文件只能定义一个组件， 文件名首字母大写， 代表它是一个组件
2. 一个组件对应的css文件， 与组件同一目录， 并且命名相同， 例如Foo.js对应的css文件为Foo.m.scss或Foo

### 路由组件的命名规范

通常一个路由组件目录结构为:

pages/ 下：

```
├── module01 # 模块名首字母小写
│   ├── Module01.js # 对应的路由组件， 首字母大写
│   ├── Module01.m.scss 
│   ├── components # module01特有的组件
│   ├── model.js # module01的model文件
│   └── service.js # api请求相关函数

```

或者逻辑上多个子模块属于一个大模块.


pages/ 下：

```
modlueParnt
├── module01
│   ├── Module01.js
│   ├── Module01.m.scss
│   ├── components
│   ├── model.js
│   └── service.js
└── module02
     ├── Module02.js
     ├── Module02.m.scss
     ├── components
     ├── model.js
     └── service.js
```

## 定义路由

在src/config/router.js定义:

```js
export default function getRouterConfig(app) {
  const routers = [
    ...
    {
      path: '/module01',
      exact: true,
      component: dynamicWrapper(app, 'module01', true),
    },
    ...
  ];
  return routers;
}
```

dynamicWrapper三个参数:

1. app
2. 'module01' 路由模块路径， 相对于`src/pages`
3. true 是否有models文件, 默认为true, 如果没有， 请输入false


## model的定义

我们约定路由模块下model.js为路由组件的特定model. 可以是单个model（参照dva model的定义）.

也可以是多个models, 写法如下:

models.js

```
export default [
  require('./models/item'), 
  require('./models/list'),
];
```