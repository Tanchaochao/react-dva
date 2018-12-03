// 这个文件为eslint-import-resolver-webpack插件的配置文件
// 如果直接指定webapck.config.dev.js, 在vscode编辑器中关于webpack设置的alias可能识别不了
// 可能是因为webpack的其它选项eslint-import-resolver-webpack不能识别导致
// 所以尽量保持配置简单
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
