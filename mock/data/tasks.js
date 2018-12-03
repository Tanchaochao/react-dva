const Mock = require('mockjs');

const { Random } = Mock;

// eslint-disable-next-line prefer-destructuring
const data = Mock.mock({
  'data|2-10': [
    {
      'id|+1': 1,
      taskName: () => Random.title(),
      taskDescription: () => Random.paragraph(1, 3),
      firstCategoryName: /类别一[0-9]{2}/,
      secondCategoryName: /类别二[0-9]{2}/,
      thirdCategoryName: /类别三[0-9]{2}/,
      manufacturerName: /制造商[0-9]{2}/,
      taskSopName: /sop[0-9]{2}/,
      taskStatus: /[0-3]/,
      updateBy: '平台管理员',
      updateAt: 1543459929179,
    },
  ],
}).data;

module.exports = data;
