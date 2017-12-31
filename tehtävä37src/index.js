import React from 'react'
import ReactDOM from 'react-dom'
import Person from './components/Person'
import personService from './services/persons'

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
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response})
      })
  }

  addPerson = (e) => {
    e.preventDefault()

    const newName = this.state.newName
    const oldPerson = this.state.persons.find(function (person) {
      return person.name === newName
    })

    if (oldPerson !== undefined) {
      const changedPerson = { ...oldPerson, number: this.state.newPhone }

      personService
        .update(changedPerson.id, changedPerson)
        .then(changedPerson => {
          const persons = this.state.persons.filter(n => n.id !== oldPerson.id)
          this.setState({
            persons: persons.concat(changedPerson)
          })
        })

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

    personService
      .create(personObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response),
          newName: '',
          newPhone: ''
        })
      })
  }

  deletePerson = (id, name) => {
    var r = window.confirm("Poistetaanko " + name +"?");
    if (r === true) {
      personService
      .remove(id)
      
      this.setState({
        persons: this.state.persons.filter(function (person) {
          return person.id !== id
        })
      })
    }
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

    const byId = (person1, person2) => person1.id - person2.id

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
        <table>
          <tbody>
            {personsToShow.sort(byId).map(person => <Person key={person.id} person={person} delete={this.deletePerson} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)