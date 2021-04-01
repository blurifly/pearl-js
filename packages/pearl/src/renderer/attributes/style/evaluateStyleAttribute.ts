
let hasUpperCaseRegex = /[A-Z]/;
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




function evaluateStyleTag(tag: any): string {
  if (typeof tag === "object") {
    return getValidCSSFromObject(tag)
  }
  return tag
}

export default evaluateStyleTag
