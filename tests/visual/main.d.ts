/**
* compares two xElements
* @param  oldElement - The previous version of the Element
* @param  newElement - The new version of the Element
*/
declare function compareElement(oldElement: {
    tagName: any;
}, newElement: {
    tagName: any;
}): {
    tagName: any;
} | undefined;
declare const compareAttrs: (oldAttrs: any, newAttrs: any) => any;
