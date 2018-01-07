const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')

app.use(morgan(':method :url :json :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())

morgan.token('json', function getJson (req) {
  return JSON.stringify(req.body)
})

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send('puhelinluettelossa ' + persons.length + ' henkilön tiedot<br />' + Date()
  )
})

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined){
    return response.status(400).json({error: 'name missing'})
  }
  if (body.number === undefined){
    return response.status(400).json({error: 'number missing'})
  }

  if(persons.find(person => person.name === body.name) !== undefined) {
    return response.status(400).json({error: 'name must be unique'})
  } 
  
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000)
  }

  persons = persons.concat(person)

  response.json(person)
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})