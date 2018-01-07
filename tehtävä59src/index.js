const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(morgan(':method :url :json :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('json', function getJson (req) {
  return JSON.stringify(req.body)
})

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons.map(formatPerson))
    })
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.send('puhelinluettelossa ' + persons.length + ' henkilön tiedot<br />' + Date())
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(formatPerson(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined){
    return response.status(400).json({error: 'name missing'})
  }
  if (body.number === undefined){
    return response.status(400).json({error: 'number missing'})
  }

  Person
    .findOne({ 'name': body.name })
    .then(person => {
      console.log(person)
      if (person) {
        return response.status(400).json({error: 'name must be unique'})
      } else {
        const person = new Person ({
          name: body.name,
          number: body.number
        })
      
        person
          .save()
          .then(savedPerson => {
            response.json(formatPerson(savedPerson))
          })
      }
    })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})