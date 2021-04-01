(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@pearl-js/pearl')) :
  typeof define === 'function' && define.amd ? define(['@pearl-js/pearl'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Pearl));
}(this, (function (Pearl) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Pearl__default = /*#__PURE__*/_interopDefaultLegacy(Pearl);

  // Instabul, Kampala

  class Navbar extends Pearl__default['default'].Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        code: ''
      };
    }

    render() {
      return Pearl__default['default'].createElement("div", {
        attributes: {
          className: "navbar"
        },
        events: {},
        children: [Pearl__default['default'].createElement("div", {
          attributes: {
            className: "logo"
          },
          events: {},
          children: [Pearl__default['default'].createElement("img", {
            attributes: {
              className: "logo_IMG",
              src: "/logo.png",
              alt: "logo"
            },
            events: {},
            children: []
          }), Pearl__default['default'].createElement("h3", {
            attributes: {},
            events: {},
            children: ["PEARL JS"]
          })]
        })]
      });
    }

  }

  class Editor extends Pearl__default['default'].Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        code: '',
        container: document.getElementById('preview')
      };
    }

    onChanging(e) {
      const value = e.target.value;
      this.updateState({
        code: value
      });
      this.state.container.innerHTML = value;
    }

    render() {
      return Pearl__default['default'].createElement("div", {
        attributes: {
          className: "editor"
        },
        events: {},
        children: [Pearl__default['default'].createElement("textarea", {
          attributes: {
            name: "textea",
            className: "editor_ground",
            id: "tt",
            cols: "30",
            rows: "10"
          },
          events: {
            input: e => {
              this.onChanging(e);
            }
          },
          children: []
        })]
      });
    }

  }

  const App = Pearl__default['default'].createElement("div", {
    attributes: {},
    events: {},
    children: [Pearl__default['default'].createComponent(Navbar, {
      children: []
    }), Pearl__default['default'].createComponent(Editor, {
      children: []
    })]
  });
  Pearl__default['default'].append(App, document.getElementById('root'), () => console.log('App has mounted'));

})));
