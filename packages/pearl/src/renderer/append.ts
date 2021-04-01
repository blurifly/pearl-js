import { initialRender } from "./initialRender"

/**
* appends a Tree to the DOM
*/
function append(Tree: any, root: HTMLElement, callback?: Function): void {
  initialRender(root, Tree)
  if (callback) {
    callback()
  }
}

export default append
