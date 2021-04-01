
import { getPropety } from '../attributes/evaluateAttributes';
import { evaluateStyleTag } from '../attributes/index';
import { compareEventListeners } from '../events/compareEvents';
import { render } from '../render';


const zip = (xs: string | any[], ys: string | any[]) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs = {}, newAttrs = {}) => {
  const patches: { ($node: any): any; ($node: any): any; }[] = [];
  for (const [k, v] of Object.entries(newAttrs)) {

    patches.push(($node: { setAttribute: (arg0: string, arg1: unknown) => void; classList: { add: (arg0: unknown) => void; }; }) => {
      if (k === "style") {
        $node.setAttribute(k, evaluateStyleTag(v))
      } else if (k.toLowerCase() === "classname") {
        $node.classList.add(v)
      } else {
        $node.setAttribute(getPropety(k), v)
      }


      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node: { removeAttribute: (arg0: string) => void; }) => {
        if (k.toLowerCase() === "className") {
          $node.removeAttribute('class')
        } else {
          $node.removeAttribute(getPropety(k))
        }
        return $node;
      });
    }
  }

  return ($node: any) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};


const diffChildren = (oldVChildren: any[], newVChildren: string | any[]) => {
  const childPatches: (($node: any) => any)[] = [];
  let elementType = 'element'
  let componentType = 'IS_X_COMPONENT'
  oldVChildren.forEach((oldVChild: { type: string; makeChild: () => any; }, i: number) => {

    let newVChild = newVChildren[i]
    let oldChild;
    let newChild;
    if (oldVChild.type === elementType) {
      oldChild = oldVChild
    }
    if (oldVChild.type === componentType) {
      oldChild = oldVChild.makeChild()
    }
    if (newVChild.type === elementType) {
      newChild = newVChild
    }
    if (newVChild.type === componentType) {
      newChild = newVChild.makeChild()
    }
    if (typeof oldVChild === 'string') {
      oldChild = oldVChild
    }
    if (typeof newVChild === 'string') {
      newChild = newVChild
    }

    // eslint-disable-next-line no-use-before-define
    childPatches.push(compareDomTrees(oldChild, newChild));
  });

  const additionalPatches: (($node: any) => any)[] = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node: { appendChild: () => void; }) => {
      let child = render(additionalVChild)
      if (child !== null) {
        $node.appendChild();
      }

      return $node;
    });
  }

  return ($parent: { childNodes: any; }) => {
    // since childPatches are expecting the $child, not $parent,
    // we cannot just loop through them and call patch($parent)
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};

export function compareDomTrees(oldDomTree: { tagName: any; attributes: {} | undefined; children: any; events: any; }, newDomTree: { tagName: any; attributes: {} | undefined; children: any; events: any; } | undefined) {

  if (newDomTree === undefined) {
    return ($node: { remove: () => void; }) => {
      $node.remove();
      return undefined;
    }
  }

  if (typeof oldDomTree === 'string' ||
    typeof newDomTree === 'string') {
    return ($node: { nodeValue: any; replaceWith: (arg0: any) => void; }) => {
      if ($node.nodeValue !== newDomTree) {
        const $newNode = render(newDomTree);
        $node.replaceWith($newNode);
        return $newNode;
      } else {
        return $node
      }
    };
  }

  if (oldDomTree.tagName !== newDomTree.tagName) {
    return ($node: { replaceWith: (arg0: any) => void; }) => {
      const newNode = render(newDomTree);
      $node.replaceWith(newNode);
      return newNode;
    };
  }

  const patchAttrs = diffAttrs(oldDomTree.attributes, newDomTree.attributes);
  const patchChildren = diffChildren(oldDomTree.children, newDomTree.children);
  const patchEvents = compareEventListeners(oldDomTree.events, newDomTree.events)

  /**
  * @param {HTMLElement} $node - root node for the component
  */
  function returnFunc(node: any) {
    patchAttrs(node);
    patchChildren(node);
    patchEvents(node)
    return node;
  }
  return (node: any) => {
    return returnFunc(node)
  };
}

