const autoprefixer = require('autoprefixer');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const cssLoader = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
  },
};


const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
};

const cssLoaderForModule = {
  loader: require.resolve('css-loader'),
  options: {
    modules: true,
    localIdentName: '[local]_[hash:base64:5]',
  },
};


// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.
const css = [
  require.resolve('style-loader'),
  cssLoader,
  postcssLoader,
];

const scss = [
  ...css,
  require.resolve('sass-loader'),
];

const less = [
  ...css,
  require.resolve('less-loader'),
];

// 不能再加style-loader了, 否则css module不生效
const cssForModule = [
  require.resolve('style-loader'),
  cssLoaderForModule,
  postcssLoader,
];

const scssForModule = [
  ...cssForModule,
  require.resolve('sass-loader'),
];

const prodCssLoader = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    minimize: true,
    sourceMap: shouldUseSourceMap,
  },
};

const prodCssLoaderForModule = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    minimize: true,
    modules: true,
    sourceMap: shouldUseSourceMap,
    localIdentName: '[local]_[hash:base64:5]',
  },
};

const prodCssForModule = [
  prodCssLoaderForModule,
  postcssLoader,
];

const prodScssForModule = [
  ...prodCssForModule,
  require.resolve('sass-loader'),
];

const prodCss = [
  prodCssLoader,
  postcssLoader,
];

const prodScss = [
  ...prodCss,
  require.resolve('sass-loader'),
];


const prodLess = [
  ...prodCss,
  require.resolve('less-loader'),
];

module.exports = {
  css,
  scss,
  less,
  cssForModule,
  scssForModule,
  prodCss,
  prodScss,
  prodLess,
  prodCssForModule,
  prodScssForModule,
};
