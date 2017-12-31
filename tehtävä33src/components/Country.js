import React from 'react'

const Country = ({ country, handleClick }) => {
  return (
    <li onClick={() => { handleClick(country.name) }}>
      {country.name}
    </li>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img src={country.flag} width="200" alt="flag" />
    </div>
  )
}

const CountryList = ({ countries, handleClick }) => {
  if(countries.length > 10) {
    return (
      <div>
        too many matches, specify another filter
      </div>
    )
  }

  if(countries.length === 1) {
    return (
      <div>
        <CountryInfo country={countries[0]} />
      </div>
    )
  }

  return (
    <div>
      <ul>
        {countries.map(country => <Country key={country.name} country={country} handleClick={handleClick} />)}
      </ul>
    </div>
  )
}

export default CountryList