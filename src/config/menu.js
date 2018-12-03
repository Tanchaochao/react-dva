const menu = [
  {
    name: 'rule',
    title: '规则录入',
    icon: 'cloudo',
    children: [
      {
        name: 'passiveSop',
        title: '被动规则录入',
        icon: 'cloudo',
      },
      {
        name: 'activeSop',
        title: '主动规则录入',
        icon: 'cloudo',
      },
    ],
  },
  {
    name: 'home',
    title: '提取任务管理',
    icon: 'cloudo',
  },
];
function formatMenu(_menu, parentPath = '/') {
  return _menu.map((item) => {
    const path = `${parentPath}${item.name}`;
    // eslint-disable-next-line no-param-reassign
    item.path = path;
    if (item.children) {
      // eslint-disable-next-line no-param-reassign
      item.children = formatMenu(item.children, `${path}/`);
    }
    return item;
  });
}


function getMenuData() {
  return formatMenu(menu);
}

export default getMenuData;
