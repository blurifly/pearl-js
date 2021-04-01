/**
* compares two xElements
* @param  oldElement - The previous version of the Element
* @param  newElement - The new version of the Element
*/
function compareElement(oldElement: { tagName: any; }, newElement: { tagName: any; }) {
  if (typeof oldElement === 'string' ||
    typeof newElement === 'string') {
    if (oldElement !== newElement) {
      return newElement
    } else {
      // this means that both trees are string
      // and they have the same values
      return newElement;
    }
  }

  if (oldElement.tagName !== newElement.tagName) {
    // we assume that they are totally different and
    // will not attempt to find the differences.
    return newElement;
  }
}

const compareAttrs = (oldAttrs: any, newAttrs: any) => {
  return newAttrs;
};
