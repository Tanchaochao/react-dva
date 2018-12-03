module.exports = [
  {
    id: 1,
    categoryCname: '一级类别1',
  },
  {
    id: 2,
    categoryCname: '一级类别3',
    children: [
      {
        id: 3,
        categoryCname: '二级类别1',
      },
    ],
  },
  {
    id: 4,
    categoryCname: '一级类别3',
    children: [
      {
        id: 5,
        categoryCname: '二级类别1',
        children: [
          {
            id: 6,
            categoryCname: '三级类别1',
          },
        ],
      },
    ],
  },
];
