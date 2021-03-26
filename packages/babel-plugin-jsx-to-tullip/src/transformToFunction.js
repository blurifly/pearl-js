/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const t = require('@babel/types')


function evaluateAttribute(attribute) {
  if (attribute.value.type === 'StringLiteral') {
    return t.toExpression(attribute.value)
  }
  if (attribute.value.type === 'JSXExpressionContainer') {
    return t.toExpression(attribute.value.expression)
  }

}
/**
* @param {string} event -
*/
function getEventName(event) {
  let eventName = event.slice(2)
  return eventName.toLowerCase()
}

export function TransformToCreateComponent(tag, attributes) {
  let props = []
  for (let attribute of attributes) {

    let attr = t.objectProperty(
      t.identifier(attribute.name.name),
      evaluateAttribute(attribute),
      false,
      false
    )
    props.push(attr)
  }
  return t.callExpression(
    t.memberExpression(
      t.identifier("X"),
      t.identifier("createComponent"),
      false
    ),
    [
      t.identifier(tag),
      t.objectExpression(
        [...props]
      ),
    ]
  )
}



/**
* @param {Array} children -
*/
export function TransformToCreateElement(tag, attributes, events, children) {
  let attrs = []
  for (let attribute of attributes) {

    let attr = t.objectProperty(
      t.identifier(attribute.name.name),
      evaluateAttribute(attribute),
      false,
      false
    )
    attrs.push(attr)
  }
  for (let child of children) {
    if (child.type === 'JSXText') {
      let Stringchild = t.stringLiteral(child.value)
      children[children.indexOf(child)] = Stringchild
    }
    if (child.type === 'JSXExpressionContainer') {
      let type = child.expression.type
      if (type === 'JSXEmptyExpression') {
        children[children.indexOf(child)] = t.stringLiteral('')
      } else {
        let Expression = t.toExpression(child.expression)
        children[children.indexOf(child)] = Expression
      }
    }
  }
  let eves = []
  for (let event of events) {
    let eve = t.objectProperty(
      t.identifier(getEventName(event.name.name)),
      t.toExpression(event.value.expression),
      false,
      false
    )
    eves.push(eve)
  }
  return t.callExpression(
    t.memberExpression(
      t.identifier("X"),
      t.identifier("createElement"),
      false
    ),
    [
      t.stringLiteral(tag),
      t.objectExpression(
        [
          t.objectProperty(
            t.identifier("attributes"),
            t.objectExpression(
              [...attrs]
            ),
            false,
            false
          ),
          t.objectProperty(
            t.identifier("events"),
            t.objectExpression(
              [...eves]
            ),
            false,
            false
          ),
          t.objectProperty(
            t.identifier("children"),
            t.arrayExpression(
              children
            ),
            false,
            false
          )
        ]
      )
    ]
  )
}


