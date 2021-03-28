/**
* Creates a new Component
*/
const createComponent = (Component, props = {}, context = {}) => {
  let c = new Component(props, context)
  return c
}

export default createComponent
