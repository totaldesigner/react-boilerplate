const path = require('path');

module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-preset-env')({
      stage: 0, // 모든 기능 사용
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
    require('cssnano'),
    require('autoprefixer'),
  ]
}
