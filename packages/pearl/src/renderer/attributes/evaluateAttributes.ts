import evaluateStyleTag from "./style/evaluateStyleAttribute";

let hasUpperCaseRegex = /[A-Z]/;
function splitProperty(property, index, append) {
  let firstSection = property.slice(0, index)
  let secondSection = property.slice(index)
  secondSection = secondSection.toLowerCase()
  return `${firstSection}${append}${secondSection}`
}
/**
* @param {string} property -
*/
export function getPropety(property) {
  let validProperty = property
  let upperCaseLetters = validProperty.match(hasUpperCaseRegex) || []
  if (upperCaseLetters.length) {
    for (let i = 0; i < upperCaseLetters.length; i++) {
      const element = upperCaseLetters[i];
      if (property.indexOf(element) !== 0) {
        validProperty = splitProperty(validProperty, property.indexOf(element), '-')
      }
    }
  }

  return validProperty;
}

/**
* Appends attributes to a node
* @param {HTMLElement} node - Node to append attributes to
* @param {object} attributes - attributes
*/
export function evaluateAttributes(node, attributes = {}) {
  for (const [property, value] of Object.entries(attributes)) {
    if (property === "style") {
      node.setAttribute(property, evaluateStyleTag(value))
    } else if (property.toLowerCase() === "classname") {
      node.classList.add(value)
    } else {
      node.setAttribute(getPropety(property), value)
    }
  }
  return node
}
