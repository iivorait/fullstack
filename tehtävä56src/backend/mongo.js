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
            const longestName = result.reduce(function (a, b) { return a.name.length > b.name.length ? a : b; });
            result.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 1;
            }).forEach(person => {
                const space = new Array(longestName.name.length - person.name.length + 4).join(" ");
                console.log(person.name + space + person.number)
            })
            mongoose.connection.close()
        })
}
