const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')


app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

mongoose.connect(config.mongoUrl, { useMongoClient: true })
mongoose.Promise = global.Promise



const PORT = config.port
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}