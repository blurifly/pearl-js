const babel = require('@babel/core');
const plugin = require('./lib')
const code = `
class Input extends X.Component {
  constructor() {
    super()
  }

  render() {
      return <span class="jim" onClick={()=>{console.log('')}} >jim <span>Jim</span> dk</span>

  }
}

`;
const output = babel.transformSync(code, {
  plugins: [
    "@babel/plugin-syntax-jsx",
    plugin
  ],
});
console.log('\n \n >>> Output Code \n');
console.log(output.code);
/* function myCustomPlugin() {
      return {
        visitor: {
          ClassMethod(path) {
            let methodNode = path.node
            if (methodNode.key.name === 'render' && methodNode.kind === 'method' && methodNode.static === false) {
              let RenderBody = methodNode.body.body
              let returnJSX;
              for (const node of RenderBody) {
                if (node.type === 'ReturnStatement') {
                  // eslint-disable-next-line no-unused-vars
                  returnJSX = node.argument
                }
              }
              console.log(returnJSX)
            }
          }
        }
      }
    } */
