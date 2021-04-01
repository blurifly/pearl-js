
export function compareState(oldComponent: { type?: string; state?: any }, newComponent: any) {
  let finalComponent = newComponent
  finalComponent.state = oldComponent.state
  return finalComponent
}
