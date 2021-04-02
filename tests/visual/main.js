(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Pearl = factory());
}(this, (function () { 'use strict';

  /**
  * Creates a new Component
  */
  const createComponent = (Component, props = {}, context = {}) => {
    let c = new Component(props, context);
    return c;
  };

  /**
  * Creates a new Element
  * @param {string} tag - A valid `DOMElement` tagname
  * @param {object} [options={ attributes: {}, events: {}, children: [] }] -
  * @param {object} options.attributes - attribute
  * @param {object} options.events - events
  * @param {Array} options.children -
  * @param {Symbol} options.ref -
  * @return {object}
  */
  function createElement(tag, {
    attributes = {},
    events = {},
    children = []
  }) {
    return {
      tag,
      attributes,
      events,
      children,
      type: 'element'
    };
  }

  let hasUpperCaseRegex = /[A-Z]/;

  function splitProperty(property, index, append) {
    let firstSection = property.slice(0, index);
    let secondSection = property.slice(index);
    secondSection = secondSection.toLowerCase();
    return `${firstSection}${append}${secondSection}`;
  }
  /**
  * @param {string} property -
  */


  function getPropety(property) {
    let validProperty = property;
    let upperCaseLetters = validProperty.match(hasUpperCaseRegex) || [];

    if (upperCaseLetters.length) {
      for (let i = 0; i < upperCaseLetters.length; i++) {
        const element = upperCaseLetters[i];

        if (property.indexOf(element) !== 0) {
          validProperty = splitProperty(validProperty, property.indexOf(element), '-');
        }
      }
    }

    return validProperty;
  }
  /**
  * Appends attributes to a node
  * @param {HTMLElement} node - Node to append attributes to
  * @param {object} attributes - attributes
  */

  function evaluateAttributes(node, attributes = {}) {
    for (const [property, value] of Object.entries(attributes)) {
      if (property === "style") {
        node.setAttribute(property, evaluateStyleTag(value));
      } else if (property.toLowerCase() === "classname") {
        node.classList.add(value);
      } else {
        node.setAttribute(getPropety(property), value);
      }
    }

    return node;
  }
  /**
  * @param {string} property -
  * @param {number} index -
  * @param {string} append -
  * @return {string} .
  */

  function splitCSSProperty(property, index, append) {
    let firstSection = property.slice(0, index);
    let secondSection = property.slice(index);
    secondSection = secondSection.toLowerCase();
    return `${firstSection}${append}${secondSection}`;
  }

  function getValidCSSFromObject(o) {
    let style = '';

    for (const [property, value] of Object.entries(o)) {
      let UpperCaseLetters = property.match(hasUpperCaseRegex);

      if (UpperCaseLetters !== null) {
        if (UpperCaseLetters.length === 1) {
          /** @typedef string */
          const beginningOfSecondWord = UpperCaseLetters[0];
          const position = property.indexOf(beginningOfSecondWord); // split the word to add a dash `-` sign betwwen them

          let CSSProperty = splitCSSProperty(property, position, '-');
          style = `${style}${CSSProperty}: ${value};`;
        }
      } else {
        style = `${style}${property}: ${value};`;
      }
    }

    return style;
  }

  function evaluateStyleTag(tag) {
    if (typeof tag === "object") {
      return getValidCSSFromObject(tag);
    }

    return tag;
  }

  /**
  * Appends events to a node that is passed in
  * @param {Node} node - The node to append the events
  * @param {object} events - an object containing the key as the event and the value as the function
  */
  function appendEvents(node, events) {
    node._pearl$config.extendEvents = events;

    for (const [k, v] of Object.entries(events)) {
      node.addEventListener(k, v);
    }
  }
  function compareEventListeners(oldEvents, newEvents) {
    return node => {
      // eslint-disable-next-line no-use-before-define
      removeFromeNode(node);
      appendEvents(node, newEvents);
      return node;
    };
  }
  /**
  * Removes events from node and adds new ones
  * @param {HTMLElement} $node - node to compare Events
  */

  function removeFromeNode($node) {
    for (const [k, v] of Object.entries($node._pearl$config.extendEvents)) {
      $node.removeEventListener(k, v);
    }
  }

  function renderElement(element, isComponentRoot = false, componentId = null) {
    const node = document.createElement(element.tag);
    node._pearl$config = {};

    if (isComponentRoot) {
      node._pearl$config.isComponentRoot = true;
      node._pearl$config.compomentRootId = componentId;
    }

    evaluateAttributes(node, element.attributes);
    appendEvents(node, element.events);

    if (element.children) {
      for (const child of element.children) {
        // eslint-disable-next-line no-use-before-define
        if (typeof child === 'string') {
          let Textnode = document.createTextNode(child);
          node.appendChild(Textnode);
        } else {
          if (Array.isArray(child)) {
            for (const elm of child) {
              let element = render(elm);
              node.appendChild(element);
            }
          } else {
            let element = render(child);

            if (element !== null && element !== undefined) {
              node.appendChild(element);
            }
          }
        }
      }
    }

    return node;
  }

  const render = xElement => {
    if (typeof xElement === 'string' || typeof xElement === "boolean" || typeof xElement === "number") {
      return document.createTextNode(`${xElement}`);
    }

    if (xElement.type === 'element') {
      return renderElement(xElement);
    }

    if (xElement.type === 'IS_X_COMPONENT') {
      let $el = xElement.makeChild();

      if (returnsNothing($el)) {
        return null;
      } // when the first element is a component


      if ($el.tag === undefined) {
        return render($el);
      }

      xElement.onWillMount();
      return renderElement($el, true, xElement.getPearlId());
    }
  };

  function returnsNothing(component) {
    if (component === null || component === undefined) {
      return true;
    }

    return false;
  }

  /* eslint-disable no-unused-vars */
  /**
  * The first time an element is rendered
  */

  function initialRender(root, tree) {
    let replacedElement = render(tree);
    root.appendChild(replacedElement);
  }

  /**
  * appends a Tree to the DOM
  */

  function append(Tree, root, callback) {
    initialRender(root, Tree);

    if (callback) {
      callback();
    }
  }

  /**
  * Base Pearl component
  */
  class Component$1 {
    constructor(props = {}, context = {}) {
      this.state = {};
      this.props = props;
      this.context = context;
    }
    /**
    * Updates a subset of the state in the class
    * @param {object} newState this subset that you want to update
    * @param {?Function} callBack this callback function that is called after state updates
    */


    _ChangeState(newState, callBack = null) {
      if (newState.constructor.name !== 'Object') {
        throw Error('updateState(...) method takes in an object');
      }

      const values = Object.getOwnPropertyNames(newState);
      const stateValues = Object.getOwnPropertyNames(this.state);

      for (let value of values) {
        if (stateValues.includes(value)) {
          this.state[value] = newState[value];
        } else {
          throw Error('The value `' + value + '` is not in the state object');
        }
      }

      if (callBack !== null) {
        callBack.call(this, newState);
      }
    }

  }

  /**
  * compares two xElements
  * @param  oldElement - The previous version of the Element
  * @param  newElement - The new version of the Element
  */

  function compareState(oldComponent, newComponent) {
    let finalComponent = newComponent;
    finalComponent.state = oldComponent.state;
    return finalComponent;
  }
  function EvaluateChildren(oldChildren, newChildren) {
    let children = [];
    let elementType = 'element';
    let componentType = 'IS_X_COMPONENT';
    oldChildren.forEach((oldChild, i) => {
      let newChild = newChildren[i];

      if (oldChild.type === newChild.type) {
        if (oldChild.type === elementType && newChild.type === elementType) {
          children.push(newChild);
        } else if (oldChild.type === componentType && newChild.type === componentType) {
          children.push(compareState(oldChild, newChild));
        } else if (typeof newChild === "string") {
          children.push(newChild);
        }
      }
    });

    for (const additionalChild of newChildren.slice(oldChildren.length)) {
      children.push(additionalChild);
    }

    return children;
  }
  function compareTree(oldDomTree, newDomTree) {
    let result = newDomTree;

    if (newDomTree === undefined) {
      return;
    }

    if (typeof oldDomTree === 'string' || typeof newDomTree === 'string') {
      if (oldDomTree !== newDomTree) {
        return newDomTree;
      } else {
        return newDomTree;
      }
    }

    if (oldDomTree.tagName !== newDomTree.tagName) {
      // we assume that they are totally different and
      // will not attempt to find the differences.
      return newDomTree;
    }

    let newChildren = EvaluateChildren(oldDomTree.children, newDomTree.children);
    result.children = newChildren;
    return result;
  }

  const zip = (xs, ys) => {
    const zipped = [];

    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
      zipped.push([xs[i], ys[i]]);
    }

    return zipped;
  };

  const diffAttrs = (oldAttrs = {}, newAttrs = {}) => {
    const patches = [];

    for (const [k, v] of Object.entries(newAttrs)) {
      patches.push($node => {
        if (k === "style") {
          $node.setAttribute(k, evaluateStyleTag(v));
        } else if (k.toLowerCase() === "classname") {
          $node.classList.add(v);
        } else {
          $node.setAttribute(getPropety(k), v);
        }

        return $node;
      });
    } // removing attrs


    for (const k in oldAttrs) {
      if (!(k in newAttrs)) {
        patches.push($node => {
          if (k.toLowerCase() === "className") {
            $node.removeAttribute('class');
          } else {
            $node.removeAttribute(getPropety(k));
          }

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
    let elementType = 'element';
    let componentType = 'IS_X_COMPONENT';
    oldVChildren.forEach((oldVChild, i) => {
      let newVChild = newVChildren[i];
      let oldChild;
      let newChild;

      if (oldVChild.type === elementType) {
        oldChild = oldVChild;
      }

      if (oldVChild.type === componentType) {
        oldChild = oldVChild.makeChild();
      }

      if (newVChild.type === elementType) {
        newChild = newVChild;
      }

      if (newVChild.type === componentType) {
        newChild = newVChild.makeChild();
      }

      if (typeof oldVChild === 'string') {
        oldChild = oldVChild;
      }

      if (typeof newVChild === 'string') {
        newChild = newVChild;
      } // eslint-disable-next-line no-use-before-define


      childPatches.push(compareDomTrees(oldChild, newChild));
    });
    const additionalPatches = [];

    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
      additionalPatches.push($node => {
        let child = render(additionalVChild);

        if (child !== null) {
          $node.appendChild();
        }

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

  function compareDomTrees(oldDomTree, newDomTree) {
    if (newDomTree === undefined) {
      return $node => {
        $node.remove();
        return undefined;
      };
    }

    if (typeof oldDomTree === 'string' || typeof newDomTree === 'string') {
      return $node => {
        if ($node.nodeValue !== newDomTree) {
          const $newNode = render(newDomTree);
          $node.replaceWith($newNode);
          return $newNode;
        } else {
          return $node;
        }
      };
    }

    if (oldDomTree.tagName !== newDomTree.tagName) {
      return $node => {
        const newNode = render(newDomTree);
        $node.replaceWith(newNode);
        return newNode;
      };
    }

    const patchAttrs = diffAttrs(oldDomTree.attributes, newDomTree.attributes);
    const patchChildren = diffChildren(oldDomTree.children, newDomTree.children);
    const patchEvents = compareEventListeners(oldDomTree.events, newDomTree.events);
    /**
    * @param {HTMLElement} $node - root node for the component
    */

    function returnFunc(node) {
      patchAttrs(node);
      patchChildren(node);
      patchEvents(node);
      return node;
    }

    return node => {
      return returnFunc(node);
    };
  }

  /**
  * Returns an `HTMLElement` represented by a given `ref`
  */
  function createId(name, key = null) {
    if (key === null || key === undefined) {
      key = Math.floor(Math.random() * 100000);
    }

    return Symbol(`${name}_${key}`);
  }

  /* eslint-disable class-methods-use-this */
  function getComponentRoot(id) {
    let nodes = null;
    let allNodes = document.querySelectorAll('*');
    allNodes.forEach(e => {
      if (e._pearl$config) {
        if (e._pearl$config.compomentRootId === id) {
          nodes = e;
        }
      }
    });
    return nodes;
  }

  class Component extends Component$1 {
    constructor(props, context = {}) {
      super(props, context);
      this.type = 'IS_X_COMPONENT';
      this.key = props.key || null;
      this.pearlId = createId(this.constructor.name, this.key);
      this.makeChild = this.makeChild.bind(this);
      this.onWillMount = this.onWillMount.bind(this);
      this.getPearlId = this.getPearlId.bind(this);
    }

    getPearlId() {
      return this.pearlId;
    }

    onWillMount() {}
    /**
    * Updates a subset of the state in the class
    * @param {any} newState this subset that you want to update
    * @param {?Function} callback this callback function that is called after state updates
    *
    * */


    updateState(newState, callback = null) {
      this._ChangeState(newState, callback);

      let $root = getComponentRoot(this.getPearlId()); // This is run if the first element in the tree is a Component

      if ($root === undefined) {
        $root = getComponentRoot(this.currentTree.pearlId);
      }

      let newTree = compareTree(this.currentTree, this.render());
      let patch = compareDomTrees(this.currentTree, newTree);
      $root = patch($root);
      this.currentTree = newTree;
    }

    makeChild() {
      this.currentTree = this.render();
      return this.currentTree;
    }

    render() {
      return {
        tagName: 'div',
        children: 'element'
      };
    }

  }

  let version = '1.0.0';
  /**
      * A Javascript library for building Browser User Interfaces
      * @author Beigana Jim Junior <jimjunior854@outlook.com>
      * @copyright Cranom © 2021
      * @license MIT
      *
      * Learn more at the official Documentation: {@link https://www.cranom.com}
      */

  const Pearl = {
    render,
    createElement,
    append,
    Component,
    createComponent,
    version
  };

  return Pearl;

})));
