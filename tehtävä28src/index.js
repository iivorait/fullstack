import React from 'react'
import ReactDOM from 'react-dom'
import Person from './components/Person'

class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        persons: [
          { name: 'Arto Hellas', phone: '1010101' }
        ],
        newName: '',
        newPhone: ''
      }
    }

    addPerson = (e) => {
      e.preventDefault()

      let newName = this.state.newName
      if(this.state.persons.find(function(person) {
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
        phone: this.state.newPhone
      }
    
      const persons = this.state.persons.concat(personObject)
    
      this.setState({
        persons: persons,
        newName: '',
        newPhone: ''
      })
    }

    handleNameChange = (e) => {
      this.setState({ newName: e.target.value })
    }

    handlePhoneChange = (e) => {
      this.setState({ newPhone: e.target.value })
    }
  
    render() {
      return (
        <div>
          <h2>Puhelinluettelo</h2>
          <form onSubmit={this.addPerson}>
            nimi: <input
                value={this.state.newName}
                onChange={this.handleNameChange}
            /><br />
            numero: <input
                value={this.state.newPhone}
                onChange={this.handlePhoneChange}
            />
            <button type="submit">lisää</button>
            </form>
          <h2>Numerot</h2>
          <ul>
            {this.state.persons.map(person => <Person key={person.name} person={person} />)}
          </ul>
        </div>
      )
    }
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)