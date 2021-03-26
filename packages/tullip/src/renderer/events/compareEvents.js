import { appendEvents } from "./appendEvents"

export function compareEventListeners(oldEvents, newEvents) {

  return node => {
    // eslint-disable-next-line no-use-before-define
    removeFromeNode(node, oldEvents)
    appendEvents(node, newEvents)
    return node
  }
}

/**
* Removes events from node and adds new ones
* @param {HTMLElement} $node - node to compare Events
*/
export function removeFromeNode($node) {
  for (const [k, v] of Object.entries($node.extendEvents)) {
    $node.removeEventListener(k, v)
  }
}
