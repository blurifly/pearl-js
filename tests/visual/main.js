(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Pearl = factory());
}(this, (function () { 'use strict';

  let version = '1.0.0';

  Element.prototype.extendEvents = {};

  Element.prototype.EXTREME$CONFIG = {
    isExtremeElement: false,
    ref: ''
  };

  /**
  * Creates a new Component
  */
  const createComponent = (Component, props = {}, context = {}) => {
    let c = new Component(props, context);
    return c
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
  function createElement(tag, { attributes = {}, events = {}, children = [] }) {
    let $el = Object.create(null);
    Object.assign($el, {
      tag,
      attributes,
      events,
      children,
      type: 'element'
    });
    return $el
  }

  let hasUpperCaseRegex = /[A-Z]/;
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
    return `${firstSection}${append}${secondSection}`
  }


  function getValidCSSFromObject(o) {
    let style = '';
    for (const [property, value] of Object.entries(o)) {
      let UpperCaseLetters = property.match(hasUpperCaseRegex);
      if (UpperCaseLetters !== null) {
        if (UpperCaseLetters.length === 1) {
          /** @typedef string */
          const beginningOfSecondWord = UpperCaseLetters[0];
          const position = property.indexOf(beginningOfSecondWord);
          // split the word to add a dash `-` sign betwwen them
          let CSSProperty = splitCSSProperty(property, position, '-');
          style = `${style}${CSSProperty}: ${value};`;
        }
      } else {
        style = `${style}${property}: ${value};`;
      }

    }
    return style
  }




  function evaluateStyleTag(tag) {
    if (typeof tag === "string") {
      return tag
    }
    if (typeof tag === "object") {
      return getValidCSSFromObject(tag)
    }
  }

  /**
  * Appends events to a node that is passed in
  * @param {Node} node - The node to append the events
  * @param {object} events - an object containing the key as the event and the value as the function
  */

  function appendEvents(node, events) {
    node.extendEvents = events;
    for (const [k, v] of Object.entries(events)) {
      node.addEventListener(k, v);
    }
  }

  function compareEventListeners(oldEvents, newEvents) {

    return node => {
      // eslint-disable-next-line no-use-before-define
      removeFromeNode(node);
      appendEvents(node, newEvents);
      return node
    }
  }

  /**
  * Removes events from node and adds new ones
  * @param {HTMLElement} $node - node to compare Events
  */
  function removeFromeNode($node) {
    for (const [k, v] of Object.entries($node.extendEvents)) {
      $node.removeEventListener(k, v);
    }
  }

  function renderElement({ tag, attributes = {}, events = {}, children = [] }) {
    /** @type {HTMLElement} */
    const $el = document.createElement(tag);
    $el.EXTREME$CONFIG.isExtremeElement = true;


    for (const [k, v] of Object.entries(attributes)) {
      if (k === 'style') {
        $el.setAttribute(k, evaluateStyleTag(v));
      } else if (k === 'ref') {
        $el.EXTREME$CONFIG.ref = v;
      } else if (k === 'className') {
        $el.setAttribute('class', v);
      } else {
        $el.setAttribute(k, v);
      }
    }

    appendEvents($el, events);

    for (const child of children) {
      if (child instanceof Node) {
        $el.appendChild(child);
      } else {
        // eslint-disable-next-line no-use-before-define
        if (typeof child === 'string') {
          let node = document.createTextNode(child);
          $el.appendChild(node);
        } else {
          let element = render(child);
          $el.appendChild(element);
        }
      }
    }

    return $el;
  }

  const render = (xElement) => {
    if (typeof xElement === 'string') {
      return document.createTextNode(xElement);
    }
    if (xElement.type === 'element') {
      return renderElement(xElement);
    }

    if (xElement.type === 'IS_X_COMPONENT') {
      let $el = xElement.makeChild();
      return renderElement($el)
    }


  };

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
        if (k === 'style') {
          $node.setAttribute(k, evaluateStyleTag(v));
        } else if (k === 'ref') {
          $node.EXTREME$CONFIG.ref = v;
        } else if (k === 'className') {
          $node.setAttribute('class', v);
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

  function compareDomTrees(oldDomTree, newDomTree) {

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
      return returnFunc(node)
    };
  }

  /* eslint-disable no-unused-vars */



  /**
  * The first time an element is rendered
  * @param {HTMLElement} root - Root Element
  * @param {object} tree - Tree
  */
  function initialRender(root, tree) {
    let replacedElement = render(tree);
    root.appendChild(replacedElement);
  }

  /**
  * appends an xElement to the DOM
  * @param {Node} xElement - xElement
  * @param {Node} Selector - a valid querySeclector such as an `id` of `class`
  * @param {?CallableFunction} callback - a callback function that is called after the element is appended
  */
  function append(xElement, Selector, callback = null) {
    initialRender(Selector, xElement);
    if (callback !== null) {
      callback.call();
    }
  }

  /**
  * Base X component
  */
  function Component$1(props = {}, context = {}) {
    this.state = {};
    this.props = props;
    this.context = context;
  }
  /**
   * Updates a subset of the state in the class
   * @param {object} newState this subset that you want to update
   * @param {?Function} callBack this callback function that is called after state updates
   */
  Component$1.prototype._ChangeState = function (newState, callBack = null) {
    if (newState.constructor.name !== 'Object') {
      throw Error('updateState(...) function takes in an object')
    }
    const values = Object.getOwnPropertyNames(newState);
    const stateValues = Object.getOwnPropertyNames(this.state);

    for (let value of values) {
      if (stateValues.includes(value)) {
        this.state[value] = newState[value];
      } else {
        throw Error(`The value ${value} is not in the state object`)
      }

    }
    if (callBack !== null) {
      callBack.call(this, newState);
    }
  };

  function compareState(oldComponent, newComponent) {
    let finalComponent = newComponent;
    finalComponent.state = oldComponent.state;
    return finalComponent
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

    return children
  }




  function compareTree(oldDomTree, newDomTree) {

    let result = newDomTree;
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

    let newChildren = EvaluateChildren(oldDomTree.children, newDomTree.children);

    result.children = newChildren;

    return result

  }

  /* eslint-disable class-methods-use-this */





  class Component extends Component$1 {
    constructor(props = {}, context = {}) {
      super(props, context);
      this.type = 'IS_X_COMPONENT';
    }
    // eslint-disable-next-line class-methods-use-this
    property() {
      return;
    }


    /**
    * Updates a subset of the state in the class
    * @param {any} newState this subset that you want to update
    * @param {?Function} callback this callback function that is called after state updates
    *
    * */
    updateState(newState, callback = null) {

      this._ChangeState(newState, callback);
      /* console.log(this.currentTree)
      console.log(this.render()) */
      let $root = document.getElementById(this.currentTree.attributes.id);
      let newTree = compareTree(this.currentTree, this.render());
      // let element = r(newTree)
      let patch = compareDomTrees(this.currentTree, newTree);
      $root = patch($root);
      this.root = $root;
      this.currentTree = newTree;
    }
    makeChild() {
      this.currentTree = this.render();
      this.root = document.getElementById(this.currentTree.attributes.id);
      return this.currentTree
    }
    render() {
      return {
        attributes: {
          id: 'tt'
        }
      }
    }

  }

  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        if (target === null || target === undefined) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null && nextSource !== undefined) {
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  //  Does not work with `new (funcA.bind(thisArg, args))`
  if (!Function.prototype.bind) (function () {
    var slice = Array.prototype.slice;
    Function.prototype.bind = function () {
      var thatFunc = this, thatArg = arguments[0];
      var args = slice.call(arguments, 1);
      if (typeof thatFunc !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - ' +
          'what is trying to be bound is not callable');
      }
      return function () {
        var funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();

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
