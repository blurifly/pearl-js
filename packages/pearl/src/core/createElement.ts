import type { PearlElement } from "../types/PearlTypes";


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
function createElement(tag: keyof HTMLElementTagNameMap, { attributes = {}, events = {}, children = [] }) :PearlElement {
  return {
    tag,
    attributes,
    events,
    children,
    type: 'element'
  }
}




export default createElement
