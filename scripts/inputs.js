
const babel = require('@rollup/plugin-babel')
const path = require('path')


module.exports = [
  {
    entry: 'src/index.js',
    output: [
      {
        format: 'cjs',
        file: 'lib/index.js'
      }
    ],
    rollupInputOptions: {
      plugins: [
        babel.babel({
          configFile: path.resolve(__dirname, '../.config/.babelrc'),
          babelHelpers: 'bundled'
        })
      ]
    },
    name: 'babel-plugin-jsx-to-tullip'
  },
  {
    entry: 'src/index.js',
    output: [
      {
        format: 'umd',
        file: 'umd/crane.development.js'
      },
      {
        format: 'umd',
        file: 'umd/crane.production.js',
        compress: true
      },
      {
        format: 'cjs',
        file: 'cjs/crane.development.js'
      },
      {
        format: 'cjs',
        file: 'cjs/crane.production.js',
        compress: true
      }
    ],
    name: 'Tullip'
  }
]
