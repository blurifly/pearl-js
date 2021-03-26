import { evaluateStyleTag } from '../attributes/index';
import { compareEventListeners } from '../events/compareEvents';
import { render } from '../render';


const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs = {}, newAttrs = {}) => {
  //console.log(oldAttrs)
  //console.log(newAttrs)
  const patches = [];
  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {

    patches.push($node => {
      if (k === 'style') {
        $node.setAttribute(k, evaluateStyleTag(v));
      } else if (k === 'ref') {
        $node.EXTREME$CONFIG.ref = v
      } else {
        $node.setAttribute(k, v);
      }

      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};


const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];
  let elementType = 'element'
  let componentType = 'IS_X_COMPONENT'
  oldVChildren.forEach((oldVChild, i) => {

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
    /* console.log(oldVChild)
    console.log(oldChild) */

    // eslint-disable-next-line no-use-before-define
    childPatches.push(compareDomTrees(oldChild, newChild));
  });

  const additionalPatches = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push($node => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return $parent => {
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

export function compareDomTrees(oldDomTree, newDomTree) {

  /* console.log(oldDomTree)
  console.log(newDomTree) */
  if (oldDomTree === undefined) {
    throw new Error('Old DOM Tree seems to be undefined')
  }

  if (newDomTree === undefined) {
    return $node => {
      $node.remove();
      return undefined;
    }
  }

  if (typeof oldDomTree === 'string' ||
    typeof newDomTree === 'string') {
    return $node => {
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
    return $node => {
      const $newNode = render(newDomTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(oldDomTree.attributes, newDomTree.attributes);
  const patchChildren = diffChildren(oldDomTree.children, newDomTree.children);
  const patchEvents = compareEventListeners(oldDomTree.events, newDomTree.events)

  /**
  * @param {HTMLElement} $node - root node for the component
  */
  function returnFunc($node) {
    patchAttrs($node);
    patchChildren($node);
    patchEvents($node)
    return $node;
  }
  return $node => {
    return returnFunc($node)
  };
}
