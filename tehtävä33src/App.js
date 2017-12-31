import React from 'react';
import CountryList from './components/Country'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      new_note: '',
      filter: ''
    }
  }

  componentWillMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value })
  }

  handleClick = (e) => {
    this.setState({ filter: e })
  }

  render() {
    const countries = this.state.countries.filter(country => 
      country.name.toLowerCase().includes(this.state.filter.toLowerCase()) === true)

    return (
      <div>
        find countries:
        <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
        />
        <CountryList countries={countries} handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App