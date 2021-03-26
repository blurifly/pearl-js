

class Card extends X.Component {
  render() {
    return <div className="card">
      <h2>Cranom INC</h2>
      <div className="pers">
        <h3 className="card_name">{this.props.name}</h3>
      </div>
    </div>
  }
}

class BusinessCard extends X.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      Title: '',
      date: ''
    }
  }
  render() {
    return <div className="cover">
      <div className="form">
        <div className="name">
          <span>FirstName: </span>
          <input type="text" name="name" value={this.state.name} onInput={(e) => {
            this.updateState({ name: e.target.value })
          }} />
        </div>
        <div className="title">
          <span>Title: </span>
          <input type="text" name="name" value={this.state.Title} onInput={(e) => {
            this.updateState({ Title: e.target.value })
          }} />
        </div>
        <div className="date">
          <span>Date Of Birth: </span>
          <input type="date" name="name" value={this.state.date} onInput={(e) => {
            this.updateState({ date: e.target.value })
          }} />
        </div>
      </div>
      <BusinessCard name={this.state.name} />
    </div>
  }
}

const App = <div><BusinessCard /></div>



X.append(App, document.getElementById('root'), () => console.log('App has mounted'))
