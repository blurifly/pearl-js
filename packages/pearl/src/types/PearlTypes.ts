

export type PearlConfig =  {
  extendEvents?: {},
  ref?: Symbol,
  isComponentRoot?: boolean,
  compomentRootId?: Symbol | null | string | number
}

export type PearlElement = {
  tag: keyof HTMLElementTagNameMap,
  attributes?: object,
  events?: object,
  children?: Array<string|PearlElement>,
  ref?: Symbol,
  type: 'element' | 'component'
}

export interface PearlDOMElement extends HTMLElement {
  _pearl$config: PearlConfig
}
