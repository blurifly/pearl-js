
// Instabul, Kampala
import Pearl from '@pearl-js/pearl'

class Navbar extends Pearl.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: ''
    }
  }
  render() {
    return <div className="navbar">
      <div className="logo">
        <img className="logo_IMG" src="/logo.png" alt="logo" />
        <h3 >PEARL JS</h3>
      </div>

    </div>
  }
}

class Editor extends Pearl.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: '',
      container: document.getElementById('preview')
    }
  }
  onChanging(e) {
    const value = e.target.value
    this.updateState({
      code: value
    })
    this.state.container.innerHTML = value
  }
  render() {
    return <div className="editor">
      <textarea name="textea" onInput={(e) => {
        this.onChanging(e)
      }} className="editor_ground" id="tt" cols="30" rows="10"></textarea>

    </div>
  }
}


const App = <div>
  <Navbar />
  <Editor />
</div>



Pearl.append(App, document.getElementById('root'), () => console.log('App has mounted'))
