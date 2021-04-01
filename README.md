
# PEARL JS
[![](https://data.jsdelivr.com/v1/package/npm/@pearl-js/pearl/badge)](https://www.jsdelivr.com/package/npm/@pearl-js/pearl)

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
import Pearl, { append } from "@pearl-js/pearl";


const button = <button id="mybutton" onClick={(e)=>{
  console.log('clicked')
}} className="btn btn-primary" >Click Me</button>

append(button, document.getElementById('button-cover'), ()=>{
  console.log('mounted')
})
```
If you dont know about `jsx`. It is a syntax that created by the creators of [React](https://reactjs.org "React Website"). It is __Javascript__ and __XML__ combined to make you be able to write `html` code in javascript. You can check it out at the [React Documentation](https://reactjs.org/docs/introducing-jsx.html).

---
This respiratory includes a packages that are usually used with `pearl` such as:
  - __Pearl.js:__ The core library.
  - __`babel-plugin-jsx-to-pearl`:__ A babel plugin that transforms `jsx` code into Pearl functions.

___

## License
Pearl is MIT licenced. You can view the licence in the [LICENCE file](./LICENSE).
