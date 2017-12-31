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

  muutaArvoa = (muuttuja, arvo) => {
    if(muuttuja === "hyvä") {
      return () => {
        this.setState({ hyva: arvo })
      }
    }
    if(muuttuja === "neutraali") {
      return () => {
        this.setState({ neutraali: arvo })
      }
    }
    if(muuttuja === "huono") {
      return () => {
        this.setState({ huono: arvo })
      }
    }
  }

  render() {
    const Button = (props) => {
      return (
          <span>
            <button onClick={this.muutaArvoa(props.label, props.value)}>{props.label}</button>
          </span>
      )
    }

    const Statistics = (props) => {
      if ((this.state.hyva + this.state.neutraali + this.state.huono) !== 0) {
        return (
          <div>
            <h1>Statistiikka</h1>
            <table>
              <tbody>
                <Statistic label="hyvä" value={this.state.hyva} />
                <Statistic label="neutraali" value={this.state.neutraali} />
                <Statistic label="huono" value={this.state.huono} />
                <Statistic label="keskiarvo" value={<Keskiarvo />} />
                <Statistic label="positiivisia" value={<Positiivisia />} />
              </tbody>
            </table>
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
        <tr>
          <td>{props.label}</td><td>{props.value}</td>
        </tr>
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
          <Button value={this.state.hyva + 1} label="hyvä" />
          <Button value={this.state.neutraali + 1} label="neutraali" />
          <Button value={this.state.huono + 1} label="huono" />
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