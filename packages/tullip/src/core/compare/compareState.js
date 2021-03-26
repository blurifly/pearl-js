
export function compareState(oldComponent, newComponent) {
  let finalComponent = newComponent
  finalComponent.state = oldComponent.state
  return finalComponent
}
