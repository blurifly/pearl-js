/* eslint-disable class-methods-use-this */
import { Component as C } from "../core/component";
import { compareTree } from "../core/compare/compareVirtualTree";
import { compareDomTrees } from "./compare/compareDOMTree";





class Component extends C {
  constructor(props = {}, context = {}) {
    super(props, context)
    this.type = 'IS_X_COMPONENT'
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

    this._ChangeState(newState, callback)
    /* console.log(this.currentTree)
    console.log(this.render()) */
    let $root = document.getElementById(this.currentTree.attributes.id)
    let newTree = compareTree(this.currentTree, this.render())
    // let element = r(newTree)
    let patch = compareDomTrees(this.currentTree, newTree)
    $root = patch($root)
    this.root = $root
    this.currentTree = newTree
  }
  makeChild() {
    this.currentTree = this.render()
    this.root = document.getElementById(this.currentTree.attributes.id)
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


export default Component
