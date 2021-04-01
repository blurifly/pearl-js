## `babel-plugin-jsx-to-pearl`

This is a babel plugin that transforms `jsx` into `pearl` fumctions.

### Installation

```bash
# using npm
npm install babel-plugin-jsx-to-pearl --save-dev

# using yarn
yarn add babel-plugin-jsx-to-pearl --dev
```

You should also install `@babel/plugin-syntax-jsx` inorder to use it.

### Usage 
You should add it to the babel configuration right after `@babel/plugin-syntax-jsx`.

```json
// .babelrc
{
  ...
  "plugins": [
    ...
    "@babel/plugin-syntax-jsx",
    "babel-plugin-jsx-to-pearl"
    ...
  ]
}

```
