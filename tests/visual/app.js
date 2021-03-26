/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


class Card extends X.Component {

  render() {
    return X.createElement('div', {
      attributes: {
        class: "business_card",
        id: 'card'
      },
      children: [
        X.createElement('div', {
          attributes: {
            class: 'name_card'
          },
          children: [
            this.props.state.name ? this.props.state.name : ''
          ]
        }),
        X.createElement('div', {
          attributes: {
            class: 'age_card'
          },
          children: [
            `${this.props.state.age}`
          ]
        }),
        X.createElement('div', {
          attributes: {
            class: 'title_card'
          },
          children: [
            `${this.props.state.title}`
          ]
        }),
      ]
    })
  }

}

class Input extends X.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      age: 0,
      title: '',
      company: '',
    }
  }

  render() {
    return X.createElement('div', {
      attributes: {
        class: 'form',
        id: 'form'
      },
      children: [
        X.createElement('div', {
          attributes: {
            class: 'name_div'
          },
          children: [
            X.createElement('span', {
              attributes: {
                class: 'firstname'
              },
              children: [
                "Firstname"
              ]
            }),
            X.createElement('input', {
              attributes: {
                class: 'firstname_input',
                value: this.state.name
              },
              events: {
                input: (e) => {
                  this.updateState({ name: e.target.value })
                }
              }
            })
          ]
        }),
        X.createElement('div', {
          attributes: {
            class: 'age_div'
          },
          children: [
            X.createElement('span', {
              attributes: {
                class: 'age'
              },
              children: [
                "Phone Number"
              ]
            }),
            X.createElement('input', {
              attributes: {
                class: 'age_input',
                type: 'date',
                value: this.state.age
              },
              events: {
                input: (e) => {
                  this.updateState({ age: e.target.value })
                }
              }
            })
          ]
        }),
        X.createElement('div', {
          attributes: {
            class: 'title_div'
          },
          children: [
            X.createElement('span', {
              attributes: {
                class: 'title'
              },
              children: [
                "Business Title"
              ]
            }),
            X.createElement('input', {
              attributes: {
                class: 'title_input',
                type: 'text',
                value: this.state.title
              },
              events: {
                input: (e) => {
                  this.updateState({ title: e.target.value })
                }
              }
            })
          ]
        }),
        X.createComponent(Card, { state: this.state })

      ]
    })
  }
}

const App = X.createElement('div', {
  children: [
    X.createComponent(Input)
  ]
})

const $app = X.render(App)


X.append($app, document.getElementById('root'), () => console.log('App has mounted'))

/*

class Input extends X.Component {
  constructor() {
    super()
  }

  render() {
      return

  }
}

*/
