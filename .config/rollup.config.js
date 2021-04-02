
// This file is used in development when testing in the browser

const path = require('path')
import { babel } from '@rollup/plugin-babel';
import AddCustionExtension from '../scripts/plugins/RollupAddExtesion';



const devConfig = {
  input: 'tests/jsx/index.js',
  output: {
    format: 'umd',
    file: 'tests/visual/app.bundle.js'
  },
  plugins: [
    babel({
      plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-jsx-to-pearl/lib/index"],
      babelHelpers: 'bundled',
    })
  ]
}


const _devConfig = {
  input: 'packages/pearl/src/index.ts',
  output: {
    format: 'umd',
    name: 'Pearl',
    file: 'tests/visual/main.js'
  },
  plugins: [
    AddCustionExtension('.ts'),
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts']
    }),
  ]
}

const pluginConfig = {
  input: 'packages/babel-plugin-jsx-to-pearl/src/index.js',
  output: {
    format: 'cjs',
    exports: "default",
    file: 'packages/babel-plugin-jsx-to-pearl/lib/index.js'
  },
  plugins: [
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
      babelHelpers: 'bundled'
    }),
  ]
}

export default [
  //pluginConfig,
  _devConfig,
  //devConfig
]
