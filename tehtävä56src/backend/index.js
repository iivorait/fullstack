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
  res.send('puhelinluettelossa ' + persons.length + ' henkilön tiedot<br />' + Date()
  )
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

  // if(persons.find(person => person.name === body.name) !== undefined) {
  //   return response.status(400).json({error: 'name must be unique'})
  // } 

  const person = new Person ({
    name: body.name,
    number: body.number
    // id: Math.floor(Math.random() * 10000)
  })

  person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })

})

// app.put('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const body = request.body

//   let person = persons.find(person => person.id === id)

//   if (person === undefined){
//     return response.status(400).json({error: 'person not found'})
//   }
  
//   person.number = body.number

//   persons = persons.filter(person => person.id !== id)
//   persons = persons.concat(person)

//   response.json(person)
  
// })

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