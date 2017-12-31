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
    return (
        <div>
            <p>yhteensä {props.kurssi.osat[0].tehtavia + props.kurssi.osat[1].tehtavia + props.kurssi.osat[2].tehtavia} tehtävää</p>
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