class Card extends X.Component {
  render() {
    return X.createElement("div", {
      attributes: {
        className: "card"
      },
      events: {},
      children: ["\n      ", X.createElement("h2", {
        attributes: {},
        events: {},
        children: ["Cranom INC"]
      }), "\n      ", X.createElement("div", {
        attributes: {
          className: "pers"
        },
        events: {},
        children: ["\n        ", X.createElement("h3", {
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

class BusinessCard extends X.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      Title: '',
      date: ''
    };
  }

  render() {
    return X.createElement("div", {
      attributes: {
        className: "cover"
      },
      events: {},
      children: ["\n      ", X.createElement("div", {
        attributes: {
          className: "form"
        },
        events: {},
        children: ["\n        ", X.createElement("div", {
          attributes: {
            className: "name"
          },
          events: {},
          children: ["\n          ", X.createElement("span", {
            attributes: {},
            events: {},
            children: ["FirstName: "]
          }), "\n          ", X.createElement("input", {
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
        }), "\n        ", X.createElement("div", {
          attributes: {
            className: "title"
          },
          events: {},
          children: ["\n          ", X.createElement("span", {
            attributes: {},
            events: {},
            children: ["Title: "]
          }), "\n          ", X.createElement("input", {
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
        }), "\n        ", X.createElement("div", {
          attributes: {
            className: "date"
          },
          events: {},
          children: ["\n          ", X.createElement("span", {
            attributes: {},
            events: {},
            children: ["Date Of Birth: "]
          }), "\n          ", X.createElement("input", {
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
      }), "\n      ", X.createComponent(BusinessCard, {
        name: this.state.name
      }), "\n    "]
    });
  }

}

const App = X.createElement("div", {
  attributes: {},
  events: {},
  children: [X.createComponent(BusinessCard, {})]
});
X.append(App, document.getElementById('root'), () => console.log('App has mounted'));
