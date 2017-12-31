import React from 'react'

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto kurssi={props.kurssi} />
            <Yhteensa kurssi={props.kurssi} />
        </div>
    )
}

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

export default Kurssi