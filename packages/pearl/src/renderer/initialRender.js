/* eslint-disable no-unused-vars */

import { compareDomTrees } from "./compare/compareDOMTree"
import { render } from "./render"



/**
* The first time an element is rendered
* @param {HTMLElement} root - Root Element
* @param {object} tree - Tree
*/
export function initialRender(root, tree) {
  let replacedElement = render(tree)
  root.appendChild(replacedElement)
}
