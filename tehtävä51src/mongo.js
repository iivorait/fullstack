const mongoose = require('mongoose')

const url = 'mongodb://tehtava40:sporderploro@ds245687.mlab.com:45687/tehtava40'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length === 4) {
    const name = process.argv[2]
    const number = process.argv[3]
    const person = new Person({
        name: name,
        number: number
      })
      
      person
      .save()
      .then(response => {
        console.log("lisätään henkilö " + name + " numero " + number + " luetteloon")
        mongoose.connection.close()
      })
} else {
    console.log("puhelinluettelo:")
    Person
        .find({})
        .then(result => {
        result.forEach(person => {
            console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
        })
}
