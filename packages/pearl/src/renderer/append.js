import { initialRender } from "./initialRender"

/**
* appends an xElement to the DOM
* @param {Node} xElement - xElement
* @param {Node} Selector - a valid querySeclector such as an `id` of `class`
* @param {?CallableFunction} callback - a callback function that is called after the element is appended
*/
function append(xElement, Selector, callback = null) {
  initialRender(Selector, xElement)
  if (callback !== null) {
    callback.call()
  }
}

export default append
