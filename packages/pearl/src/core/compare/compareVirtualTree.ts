import { compareState } from "./compareState";

export function EvaluateChildren(oldChildren: any[], newChildren: string | any[]) {
  let children = []
  let elementType = 'element'
  let componentType = 'IS_X_COMPONENT'


  oldChildren.forEach((oldChild: { type: string; }, i: number) => {
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




export function compareTree(oldDomTree: { tagName: any; children: any; }, newDomTree: { tagName: any; children: any; } | undefined) {

  let result: any = newDomTree



  if (newDomTree === undefined) {
    return;
  }

  if (typeof oldDomTree === 'string' ||
    typeof newDomTree === 'string') {
    if (oldDomTree !== newDomTree) {
      return newDomTree
    } else {
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
