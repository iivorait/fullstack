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
    const Button = (props) => {
      return (
          <span>
            <button onClick={props.func}>{props.label}</button>
          </span>
      )
    }

    const Statistics = (props) => {
      if ((this.state.hyva + this.state.neutraali + this.state.huono) != 0) {
        return (
          <div>
            <h1>Statistiikka</h1>
            <Statistic label="hyvä" value={this.state.hyva} />
            <Statistic label="neutraali" value={this.state.neutraali} />
            <Statistic label="huono" value={this.state.huono} />
            <Statistic label="keskiarvo" value={<Keskiarvo />} />
            <Statistic label="positiivisia" value={<Positiivisia />} />
          </div>
        )
      }
      return (
        <div>
          <h1>Statistiikka</h1>
          <p>Yhtään palautetta ei ole annettu</p>
        </div>
      )
    }

    const Statistic = (props) => {
      return (
        <span>
          {props.label}: {props.value} <br />
        </span>
      )
    }

    const Keskiarvo = (props) => {
      let maara = this.state.hyva + this.state.neutraali + this.state.huono
      let pisteita = this.state.hyva + this.state.huono * -1
      return (
          <span>
            {pisteita / maara}
          </span>
      )
    }

    const Positiivisia = (props) => {
      let maara = this.state.hyva + this.state.neutraali + this.state.huono
      return (
          <span>
            {(this.state.hyva / maara) * 100} %
          </span>
      )
    }

    return (
      <div>
        <h1>Anna palautetta</h1>
        <div>
          <Button func={this.hyvaPalaute} label="hyvä" />
          <Button func={this.neutraaliPalaute} label="neutraali" />
          <Button func={this.huonoPalaute} label="huono" />
        </div>
        <Statistics />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)