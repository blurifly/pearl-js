/* eslint-disable class-methods-use-this */
import { Component as C } from "../core/component";
import { compareTree } from "../core/UpdateTree";
import { compareDomTrees } from "./UpdateDom";
import { createId } from '../core/Selectors';
import { PearlDOMElement, PearlElement } from "../types/PearlTypes";

export function getComponentRoot(id: Symbol): PearlDOMElement | null {
  let nodes: PearlDOMElement | null = null
  let allNodes = document.querySelectorAll('*') as NodeListOf<PearlDOMElement>
  allNodes.forEach((e) => {
    if (e._pearl$config) {
      if (e._pearl$config.compomentRootId === id) {
        nodes = e
      }
    }

  })

  return nodes
}



class Component extends C {
  key: any;
  type: 'IS_X_COMPONENT';
  pearlId: symbol;
  currentTree: any;
  constructor(props: {key: any} , context = {}) {
    super(props, context)
    this.type = 'IS_X_COMPONENT'
    this.key = props.key || null
    this.pearlId = createId(this.constructor.name, this.key)
    this.makeChild = this.makeChild.bind(this)
    this.onWillMount = this.onWillMount.bind(this)
    this.getPearlId = this.getPearlId.bind(this)
  }

  getPearlId() {
    return this.pearlId
  }

  onWillMount() { }


  /**
  * Updates a subset of the state in the class
  * @param {any} newState this subset that you want to update
  * @param {?Function} callback this callback function that is called after state updates
  *
  * */
  updateState(newState: object, callback: Function | null = null) {

    this._ChangeState(newState, callback)
    let $root = getComponentRoot(this.getPearlId())

    // This is run if the first element in the tree is a Component
    if ($root === undefined) {
      $root = getComponentRoot(this.currentTree.pearlId)
    }

    let newTree = compareTree(this.currentTree, this.render())

    let patch = compareDomTrees(this.currentTree, newTree)

    $root = patch($root)

    this.currentTree = newTree
  }
  makeChild() {
    this.currentTree = this.render()
    return this.currentTree
  }
  render() : { tagName: any; children: any; } {
    return {tagName: 'div', children: 'element'}
  }

}


export default Component
