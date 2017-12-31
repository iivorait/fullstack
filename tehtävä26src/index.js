import React from 'react'
import ReactDOM from 'react-dom'
import Person from './components/Person'

class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        persons: [
          { name: 'Arto Hellas' }
        ],
        newName: ''
      }
    }

    addPerson = (e) => {
      e.preventDefault()
      const personObject = {
        name: this.state.newName
      }
    
      const persons = this.state.persons.concat(personObject)
    
      this.setState({
        persons: persons,
        newName: ''
      })
    }

    handleNameChange = (e) => {
      this.setState({ newName: e.target.value })
    }
  
    render() {
      return (
        <div>
          <h2>Puhelinluettelo</h2>
          <form onSubmit={this.addPerson}>
            nimi: <input
                value={this.state.newName}
                onChange={this.handleNameChange}
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