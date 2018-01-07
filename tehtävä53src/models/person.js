const mongoose = require('mongoose')

const url = 'mongodb://tehtava40:sporderploro@ds245687.mlab.com:45687/tehtava40'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person