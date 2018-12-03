const Mock = require('mockjs');

const { Random } = Mock;

// eslint-disable-next-line prefer-destructuring
const data = Mock.mock({
  'data|2-6': [
    {
      'id|+1': 1,
      name: () => Random.title(),
    },
  ],
}).data;

module.exports = data;
