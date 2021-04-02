import { PearlDOMElement } from "../types/PearlTypes"

/**
* Appends events to a node that is passed in
* @param {Node} node - The node to append the events
* @param {object} events - an object containing the key as the event and the value as the function
*/
export function appendEvents(node: PearlDOMElement, events: object ) {
  node._pearl$config.extendEvents = events
  for (const [k, v] of Object.entries(events)) {
    node.addEventListener(k, v)
  }
}



export function compareEventListeners(oldEvents: any, newEvents: object) {

  return (node: PearlDOMElement) => {
    // eslint-disable-next-line no-use-before-define
    removeFromeNode(node)
    appendEvents(node, newEvents)
    return node
  }
}

/**
* Removes events from node and adds new ones
* @param {HTMLElement} $node - node to compare Events
*/
export function removeFromeNode($node: PearlDOMElement) {
  for (const [k, v] of Object.entries($node._pearl$config.extendEvents)) {
    $node.removeEventListener(k, v)
  }
}
