/* eslint-disable no-unused-vars */

import { compareDomTrees } from "./compare/compareDOMTree"



/**
* The first time an element is rendered
* @param {HTMLElement} root - Root Element
* @param {object} tree - Tree
*/
export function initialRender(root, tree) {
  let replacedElement = document.createElement('div')
  root.appendChild(replacedElement)
  let dummyTree = {
    tag: 'dummytag',
    attributes: {},
    events: {},
    children: [],
    type: 'element'
  }
  let compareInitialDom = compareDomTrees(dummyTree, tree)
  replacedElement = compareInitialDom(replacedElement)
}
