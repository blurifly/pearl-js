import { evaluateAttributes } from "./ElementAttributes";
import { appendEvents } from "./Events";
import { PearlElement, PearlDOMElement } from "../types/PearlTypes";

function renderElement(element: PearlElement, isComponentRoot = false, componentId = null) {
  const node = document.createElement(element.tag) as PearlDOMElement
  node._pearl$config = {}
  if (isComponentRoot) {
    node._pearl$config.isComponentRoot = true
    node._pearl$config.compomentRootId = componentId
  }


  evaluateAttributes(node, element.attributes)

  appendEvents(node, element.events)
  if (element.children) {



  for (const child of element.children) {
      // eslint-disable-next-line no-use-before-define
      if (typeof child === 'string') {
        let Textnode = document.createTextNode(child)
        node.appendChild(Textnode)
      } else {
        if (Array.isArray(child)) {
          for (const elm of child) {
            let element = render(elm)
            node.appendChild(element);

          }
        } else {
          let element = render(child)
          if (element !== null && element !== undefined) {

            node.appendChild(element);
          }
        }

      }
  }
}

  return node;
}

export const render = (xElement: any) : any | PearlDOMElement => {
  if (typeof xElement === 'string' || typeof xElement === "boolean" || typeof xElement === "number") {
    return document.createTextNode(`${xElement}`);
  }
  if (xElement.type === 'element') {
    return renderElement(xElement);
  }

  if (xElement.type === 'IS_X_COMPONENT') {
    let $el = xElement.makeChild()
    if (returnsNothing($el)) {
      return null
    }
    // when the first element is a component
    if ($el.tag === undefined) {
      return render($el)
    }
    xElement.onWillMount()
    return renderElement($el, true, xElement.getPearlId())
  }

};

function returnsNothing(component: any) : boolean {
  if (component === null || component === undefined) {
    return true
  }
  return false
}
