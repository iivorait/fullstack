import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  hyvaPalaute = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  neutraaliPalaute = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }

  huonoPalaute = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <div>
          <button onClick={this.hyvaPalaute}>hyvä</button>
          <button onClick={this.neutraaliPalaute}>neutraali</button>
          <button onClick={this.huonoPalaute}>huono</button>
        </div>
        <div>
          <h1>Statistiikka</h1>
          hyvä: {this.state.hyva} <br />
          neutraali: {this.state.neutraali}<br />
          huono: {this.state.huono}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)