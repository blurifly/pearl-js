
// This file is used in development when testing in the browser

const path = require('path')
import { babel } from '@rollup/plugin-babel';

const devConfig = {
  input: 'tests/jsx/index.js',
  output: {
    format: 'umd',
    file: 'tests/visual/app.bundle.js'
  },
  plugins: [
    babel({
      plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-jsx-to-pearl/lib/index"],
      babelHelpers: 'bundled'
    })
  ]
}


const _devConfig = {
  input: 'packages/pearl/src/index.js',
  output: {
    format: 'umd',
    name: 'Pearl',
    file: 'tests/visual/main.js'
  },
  plugins: [
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
      babelHelpers: 'bundled'
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
  pluginConfig,
  _devConfig,
  devConfig
]
