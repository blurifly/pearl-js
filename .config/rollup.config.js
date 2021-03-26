
// This file is used in development when testing in the browser

const path = require('path')
import { babel } from '@rollup/plugin-babel';

const devConfig = {
  input: 'tests/jsx/index.js',
  output: {
    format: 'esm',
    file: 'tests/visual/app.bundle.js'
  },
  plugins: [
    babel({
      plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-jsx-to-tullip/lib/index"],
      babelHelpers: 'bundled'
    })
  ]
}

const _devConfig = {
  input: 'packages/tullip/src/index.js',
  output: {
    format: 'umd',
    name: 'X',
    file: 'tests/visual/main.js'
  }
}

const pluginConfig = {
  input: 'packages/babel-plugin-jsx-to-tullip/src/index.js',
  output: {
    format: 'cjs',
    exports: "default",
    file: 'packages/babel-plugin-jsx-to-tullip/lib/index.js'
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