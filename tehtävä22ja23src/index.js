import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi.nimi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <h2>sisältö</h2>
            <ul>
                {props.kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
            </ul>
        </div>
    )
}

const Osa = ({osa}) => {
    return (
        <li>
            {osa.nimi} {osa.tehtavia}
        </li>
    )
}

const Yhteensa = (props) => {
    let yht = props.kurssi.osat.reduce(function(summa, osa) {
        return summa + osa.tehtavia
    }, 0)
    return (
        <div>
            <p>yhteensä {yht} tehtävää</p>
        </div>
    )
}

const App = () => {
    const Kurssi = (props) => {
        return (
            <div>
                <Otsikko kurssi={props.kurssi} />
                <Sisalto kurssi={props.kurssi} />
                <Yhteensa kurssi={props.kurssi} />
            </div>
        )
      }

    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1,
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2,
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3,
          }
        ]
      }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)