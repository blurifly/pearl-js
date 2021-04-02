

let hasUpperCaseRegex = /[A-Z]/;
function splitProperty(property: string, index: number, append: string) {
  let firstSection = property.slice(0, index)
  let secondSection = property.slice(index)
  secondSection = secondSection.toLowerCase()
  return `${firstSection}${append}${secondSection}`
}
/**
* @param {string} property -
*/
export function getPropety(property: string ) {
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
export function evaluateAttributes(node: { setAttribute: (arg0: string, arg1: unknown) => void; classList: { add: (arg0: unknown) => void; }; }, attributes = {}) {
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


/**
* @param {string} property -
* @param {number} index -
* @param {string} append -
* @return {string} .
*/
function splitCSSProperty(property: string, index: number, append: string): string {
  let firstSection = property.slice(0, index)
  let secondSection = property.slice(index)
  secondSection = secondSection.toLowerCase()
  return `${firstSection}${append}${secondSection}`
}


function getValidCSSFromObject(o: object) {
  let style = ''
  for (const [property, value] of Object.entries(o)) {
    let UpperCaseLetters = property.match(hasUpperCaseRegex)
    if (UpperCaseLetters !== null) {
      if (UpperCaseLetters.length === 1) {
        /** @typedef string */
        const beginningOfSecondWord = UpperCaseLetters[0]
        const position = property.indexOf(beginningOfSecondWord)
        // split the word to add a dash `-` sign betwwen them
        let CSSProperty = splitCSSProperty(property, position, '-')
        style = `${style}${CSSProperty}: ${value};`
      }
    } else {
      style = `${style}${property}: ${value};`
    }

  }
  return style
}




export function evaluateStyleTag(tag: any): string {
  if (typeof tag === "object") {
    return getValidCSSFromObject(tag)
  }
  return tag
}


