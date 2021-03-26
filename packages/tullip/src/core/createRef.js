/** @typedef {Symbol} Ref */

/**
* Returns an `HTMLElement` represented by a given `ref`
* @param {Ref} ref - Ref
* @returns {HTMLElement}
*//* eslint-disable no-unused-vars */
export function getRef(ref) {
  let nodeArray = []
  let allNodes = document.querySelectorAll('*')
  allNodes.forEach((e) => {
    if (e.EXTREME$CONFIG.ref === ref) {
      console.log('element ref', e.EXTREME$CONFIG.ref)
      console.log('e', e)
      nodeArray.push(e)
    }
  })
  return nodeArray[0]
}





/**
* Creates a reference `Symbol`. This can be used to identify an element in the DOM
* @param {string} ref - A reference string.
* @returns {Ref}
*/
export function createRef(ref) {
  return Symbol(ref)
}

