/**
* Appends events to a node that is passed in
* @param {Node} node - The node to append the events
* @param {object} events - an object containing the key as the event and the value as the function
*/

export function appendEvents(node, events) {
  node.extendEvents = events
  for (const [k, v] of Object.entries(events)) {
    node.addEventListener(k, v)
  }
}

