
/**
* Creates a new Element
* @param {string} tag - A valid `DOMElement` tagname
* @param {object} [options={ attributes: {}, events: {}, children: [] }] -
* @param {object} options.attributes - attribute
* @param {object} options.events - events
* @param {Array} options.children -
* @param {Symbol} options.ref -
* @return {object}
*/
function createElement(tag, { attributes = {}, events = {}, children = [] }) {
  let $el = Object.create(null)
  Object.assign($el, {
    tag,
    attributes,
    events,
    children,
    type: 'element'
  })
  return $el
}




export default createElement
