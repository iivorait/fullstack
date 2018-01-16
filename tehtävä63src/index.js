const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

const mongoUrl = 'mongodb://blog:ljkljlkjkljlkjk@ds247007.mlab.com:47007/blogi'
mongoose.connect(mongoUrl, { useMongoClient: true })
mongoose.Promise = global.Promise



const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})