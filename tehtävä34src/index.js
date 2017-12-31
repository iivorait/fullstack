import React from 'react'
import ReactDOM from 'react-dom'
import Person from './components/Person'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filter: ''
    }
  }

  componentWillMount() {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (e) => {
    e.preventDefault()

    let newName = this.state.newName
    if (this.state.persons.find(function (person) {
      return person.name === newName
    }) !== undefined) {
      this.setState({
        newName: '',
        newPhone: ''
      })
      return
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newPhone
    }

    axios.post('http://localhost:3001/persons', personObject)
    .then(response => {
      this.setState({
        persons: this.state.persons.concat(response.data),
        newName: '',
        newPhone: ''
      })
    })
  }

  handleNameChange = (e) => {
    this.setState({ newName: e.target.value })
  }

  handlePhoneChange = (e) => {
    this.setState({ newPhone: e.target.value })
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value })
  }

  render() {
    const personsToShow =
      this.state.filter === '' ?
        this.state.persons :
        this.state.persons.filter(person =>
          person.name.toLowerCase().includes(this.state.filter.toLowerCase()) === true
        )

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        rajaa näytettäviä: 
        <input value={this.state.filter} onChange={this.handleFilterChange} />
        <h2>Lisää uusi numero</h2>
        <form onSubmit={this.addPerson}>
          nimi: 
          <input value={this.state.newName} onChange={this.handleNameChange} />
          <br />
          numero: 
          <input value={this.state.newPhone} onChange={this.handlePhoneChange} />
          <button type="submit">lisää</button>
        </form>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(person => <Person key={person.id} person={person} />)}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)