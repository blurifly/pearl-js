/* eslint-disable no-unused-vars */

import { render } from "./render"



/**
* The first time an element is rendered
*/
export function initialRender(root: HTMLElement, tree: object) {
  let replacedElement = render(tree)
  root.appendChild(replacedElement)
}
