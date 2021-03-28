import { evaluateStyleTag } from "./attributes/index";
import { appendEvents } from "./events/appendEvents";


function renderElement({ tag, attributes = {}, events = {}, children = [] }) {
  /** @type {HTMLElement} */
  const $el = document.createElement(tag);
  $el.EXTREME$CONFIG.isExtremeElement = true


  for (const [k, v] of Object.entries(attributes)) {
    if (k === 'style') {
      $el.setAttribute(k, evaluateStyleTag(v));
    } else if (k === 'ref') {
      $el.EXTREME$CONFIG.ref = v
    } else if (k === 'className') {
      $el.setAttribute('class', v)
    } else {
      $el.setAttribute(k, v);
    }
  }

  appendEvents($el, events)

  for (const child of children) {
    if (child instanceof Node) {
      $el.appendChild(child)
    } else {
      // eslint-disable-next-line no-use-before-define
      if (typeof child === 'string') {
        let node = document.createTextNode(child)
        $el.appendChild(node)
      } else {
        let element = render(child)
        $el.appendChild(element);
      }
    }
  }

  return $el;
}

export const render = (xElement) => {
  if (typeof xElement === 'string') {
    return document.createTextNode(xElement);
  }
  if (xElement.type === 'element') {
    return renderElement(xElement);
  }

  if (xElement.type === 'IS_X_COMPONENT') {
    let $el = xElement.makeChild()
    return renderElement($el)
  }


};
