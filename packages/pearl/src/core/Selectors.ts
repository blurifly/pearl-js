import { PearlDOMElement } from "../types/PearlTypes";

type Ref = Symbol
/**
* Returns an `HTMLElement` represented by a given `ref`
*/
/* eslint-disable no-unused-vars */
export function getRef(ref: Ref): PearlDOMElement | null {
  let node: PearlDOMElement | null = null
  let allNodes = document.querySelectorAll('*') as NodeListOf<PearlDOMElement>
  allNodes.forEach((e: PearlDOMElement) => {
    if (e._pearl$config.ref === ref) {
      node = e
    }
  })
  return node
}


export function createId(name: string, key: null | number = null) {
  if (key === null || key === undefined) {
    key = Math.floor(Math.random() * 100000)
  }
  return Symbol(`${name}_${key}`)
}



/**
* Creates a reference `Symbol`. This can be used to identify an element in the DOM
* @param {string} ref - A reference string.
* @returns {Ref}
*/
export function createRef(ref: string | null = null): Ref {
  let randomKey = Math.floor(Math.random() * 100000)
  if (ref === null) {
    return Symbol(`__null_ref__${randomKey}`)
  }
  return Symbol(`${ref}__${randomKey}`)
}

