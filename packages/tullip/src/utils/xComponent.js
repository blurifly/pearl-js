
/**
 * Class Mix-ins that adds state to a class and enables you to get the `updateState` function
 * @param {class} Class The class that you want to add state management to
 */

export let StateFullClass = Class => class extends Class {
  constructor() {
    super()
    this.state = {}
  }
  /**
   * Updates a subset of the state in the class
   * @param {object} newState this subset that you want to update
   * @param {?Function} callBack this callback function that is called after state updates
   */
  updateState(newState, callBack = null) {
    if (newState.constructor.name !== 'Object') {
      throw Error('updateState(...) function takes in an object')
    }
    const values = Object.getOwnPropertyNames(newState)
    const stateValues = Object.getOwnPropertyNames(this.state)

    for (let value of values) {
      const eval1 = eval
      if (stateValues.includes(value)) {
        eval1(`this.state.${value} = newState.${value}`)
      } else {
        throw Error(`The value ${value} is not in the state object`)
      }

    }
    if (callBack !== null) {
      callBack.call(this, newState)
    }
  }
}

