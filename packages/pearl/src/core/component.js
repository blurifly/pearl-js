/**
* Base X component
*/
export function Component(props = {}, context = {}) {
  this.state = {}
  this.props = props
  this.context = context
}
/**
 * Updates a subset of the state in the class
 * @param {object} newState this subset that you want to update
 * @param {?Function} callBack this callback function that is called after state updates
 */
Component.prototype._ChangeState = function (newState, callBack = null) {
  if (newState.constructor.name !== 'Object') {
    throw Error('updateState(...) function takes in an object')
  }
  const values = Object.getOwnPropertyNames(newState)
  const stateValues = Object.getOwnPropertyNames(this.state)

  for (let value of values) {
    if (stateValues.includes(value)) {
      this.state[value] = newState[value]
    } else {
      throw Error(`The value ${value} is not in the state object`)
    }

  }
  if (callBack !== null) {
    callBack.call(this, newState)
  }
}





