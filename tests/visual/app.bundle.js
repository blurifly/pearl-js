class Card extends Pearl.Component {
  render() {
    return Pearl.createElement("div", {
      attributes: {
        id: "card",
        className: "card"
      },
      events: {},
      children: ["\n      ", Pearl.createElement("h2", {
        attributes: {},
        events: {},
        children: ["Cranom INC"]
      }), "\n      ", Pearl.createElement("div", {
        attributes: {
          className: "pers"
        },
        events: {},
        children: ["\n        ", Pearl.createElement("p", {
          attributes: {
            className: "card_name"
          },
          events: {},
          children: [this.props.name]
        }), "\n      "]
      }), "\n    "]
    });
  }

}

class BusinessCard extends Pearl.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      Title: '',
      date: ''
    };
  }

  render() {
    return Pearl.createElement("div", {
      attributes: {
        id: "gg",
        className: "cover"
      },
      events: {},
      children: ["\n      ", Pearl.createElement("div", {
        attributes: {
          className: "form"
        },
        events: {},
        children: ["\n        ", Pearl.createElement("div", {
          attributes: {
            className: "name"
          },
          events: {},
          children: ["\n          ", Pearl.createElement("span", {
            attributes: {},
            events: {},
            children: ["FirstName: "]
          }), "\n          ", Pearl.createElement("input", {
            attributes: {
              type: "text",
              name: "name",
              value: this.state.name
            },
            events: {
              input: e => {
                this.updateState({
                  name: e.target.value
                });
              }
            },
            children: []
          }), "\n        "]
        }), "\n        ", Pearl.createElement("div", {
          attributes: {
            className: "title"
          },
          events: {},
          children: ["\n          ", Pearl.createElement("span", {
            attributes: {},
            events: {},
            children: ["Title: "]
          }), "\n          ", Pearl.createElement("input", {
            attributes: {
              type: "text",
              name: "name",
              value: this.state.Title
            },
            events: {
              input: e => {
                this.updateState({
                  Title: e.target.value
                });
              }
            },
            children: []
          }), "\n        "]
        }), "\n        ", Pearl.createElement("div", {
          attributes: {
            className: "date"
          },
          events: {},
          children: ["\n          ", Pearl.createElement("span", {
            attributes: {},
            events: {},
            children: ["Date Of Birth: "]
          }), "\n          ", Pearl.createElement("input", {
            attributes: {
              type: "date",
              name: "name",
              value: this.state.date
            },
            events: {
              input: e => {
                this.updateState({
                  date: e.target.value
                });
              }
            },
            children: []
          }), "\n        "]
        }), "\n      "]
      }), "\n      ", Pearl.createComponent(Card, {
        name: this.state.name
      }), "\n    "]
    });
  }

}

const App = Pearl.createElement("div", {
  attributes: {},
  events: {},
  children: [Pearl.createComponent(BusinessCard, {})]
});
Pearl.append(App, document.getElementById('root'), () => console.log('App has mounted'));
