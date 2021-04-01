/**
* Creates a new Component
*/
const createComponent = (Component: new (arg0: {}, arg1: {}) => any, props = {}, context = {}) => {
  let c = new Component(props, context)
  return c
}

export default createComponent
