
# PEARL JS
### `[@pearl-js/pearl](https://www.npmjs.com/package/@pearl-js/pearl)`
A Javascript library for building Browser User Interfaces.
Pearl JS is a component base javascript rendering library for creating User Interfaces in the browser.

## Installation
`Pearl Js` can be added to a website by adding the following script in the `html` of your website.

```html
<script src="https://cdn.jsdelivr.net/npm/@pearl-js/pearl@1.0.1/umd/pearljs.production.js" ></script>
```

### Using `npm` or `yarn`

If your are using `npm` or `yarn` all you have to do is add the package to your project.

```bash
# npm
npm install @pearl-js/pearl

# yarn
yarn add @pearl-js/pearl
```

## Usage
Pearl can be used directly using javascript syntax but this is usually hard since you will write alot of functions so we developed a [babel plugin](https://www.npmjs.com/package/babel-plugin-jsx-to-pearl) that transforms `jsx` into `pearl` functions.

### Using plain Javascript
```js
const button = Pearl.createElement("button", {
  attributes: {
    id: "mybutton",
    className: "btn btn-primary"
  },
  events: {
    click: (e)=> {
      console.log('clicked')
    }
  },
  children: [
    "Click Me"
  ]
})

Pearl.append(button, document.getElementById('button-cover'), ()=>{
  console.log('mounted')
})

```
### Using `jsx`
```jsx
import Pearl, {append} from "@pearl-js/pearl";


const button = <button id="mybutton" onClick={(e)=>{
  console.log('clicked')
}} className="btn btn-primary" >Click Me</button>

append(button, document.getElementById('button-cover'), ()=>{
  console.log('mounted')
})
```

Both of the above create the same button.

If you want to use `jsx` you should install [babel-plugin-jsx-to-pearl](https://www.npmjs.com/package/babel-plugin-jsx-to-pearl) and also `@babel/plugin-syntax-jsx` and add them to your babel configuration. These will transform all `jsx` code into Pearl functions. And always add `@babel/plugin-syntax-jsx` before `babel-plugin-jsx-to-pearl`.
```bash
# using npm
npm install babel-plugin-jsx-to-pearl --save-dev

# using yarn
yarn add babel-plugin-jsx-to-pearl --dev
```
Inside the babel configuration file
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
___
## License
MIT License
