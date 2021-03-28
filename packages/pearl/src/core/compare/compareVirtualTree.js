import { compareState } from "./compareState";

export function EvaluateChildren(oldChildren, newChildren) {
  let children = []
  let elementType = 'element'
  let componentType = 'IS_X_COMPONENT'

  oldChildren.forEach((oldChild, i) => {
    let newChild = newChildren[i]
    if (oldChild.type === newChild.type) {
      if (oldChild.type === elementType && newChild.type === elementType) {
        children.push(newChild)
      } else if (oldChild.type === componentType && newChild.type === componentType) {
        children.push(compareState(oldChild, newChild))
      } else if (typeof newChild === "string") {
        children.push(newChild)
      }
    }
  });

  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    children.push(additionalChild)
  }

  return children
}




export function compareTree(oldDomTree, newDomTree) {

  let result = newDomTree
  /* console.log('result', result)
    console.log('oldDomTree', oldDomTree) */

  if (oldDomTree === undefined) {
    throw new Error('Old DOM Tree seems to be undefined')
  }

  if (newDomTree === undefined) {
    return;
  }

  if (typeof oldDomTree === 'string' ||
    typeof newDomTree === 'string') {
    if (oldDomTree !== newDomTree) {
      return newDomTree
    } else {
      // this means that both trees are string
      // and they have the same values
      return newDomTree;
    }
  }

  if (oldDomTree.tagName !== newDomTree.tagName) {
    // we assume that they are totally different and
    // will not attempt to find the differences.
    return newDomTree;
  }

  let newChildren = EvaluateChildren(oldDomTree.children, newDomTree.children)

  result.children = newChildren

  return result

}
