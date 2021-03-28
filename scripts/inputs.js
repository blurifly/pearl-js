
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
    name: 'babel-plugin-jsx-to-pearl'
  },
  {
    entry: 'src/index.js',
    output: [
      {
        format: 'umd',
        file: 'umd/pearljs.development.js'
      },
      {
        format: 'umd',
        file: 'umd/pearljs.production.js',
        compress: true
      },
      {
        format: 'cjs',
        file: 'cjs/pearljs.development.js'
      },
      {
        format: 'cjs',
        file: 'cjs/pearljs.production.js',
        compress: true
      }
    ],
    name: 'Pearl'
  }
]
