
let hasUpperCaseRegex = /[A-Z]/;
/**
* @param {string} property -
* @param {number} index -
* @param {string} append -
* @return {string} .
*/
function splitCSSProperty(property, index, append) {
  let firstSection = property.slice(0, index)
  let secondSection = property.slice(index)
  secondSection = secondSection.toLowerCase()
  return `${firstSection}${append}${secondSection}`
}


function getValidCSSFromObject(o) {
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




function evaluateStyleTag(tag) {
  if (typeof tag === "string") {
    return tag
  }
  if (typeof tag === "object") {
    return getValidCSSFromObject(tag)
  }
}

export default evaluateStyleTag
