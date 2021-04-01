import { PearlDOMElement } from "../../types/PearlTypes"
import { appendEvents } from "./appendEvents"

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
