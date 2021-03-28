import { version } from './header'
export * from './renderer/events/customEventTarget'
export * from './renderer/element/elementConfig'
import createComponent from "./core/createComponent";
import createElement from "./core/createElement";
import append from "./renderer/append";
import Component from "./renderer/createComponent";
import { render } from "./renderer/render";



export * from "./utils/objectAssign";
/**
    * A Javascript library for building Browser User Interfaces
    * @author Beigana Jim Junior <jimjunior854@outlook.com>
    * @copyright Cranom © 2021
    * @license MIT
    *
    * Learn more at the official Documentation: {@link https://www.cranom.com}
    */
const Pearl = {
  render,
  createElement,
  append,
  Component,
  createComponent,
  version
}
export default Pearl

