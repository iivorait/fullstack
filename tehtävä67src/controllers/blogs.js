const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs) //blogs.map(formatNote)
  })

blogsRouter.post('/', async (request, response) => {
    try {
      const blog = new Blog(request.body)
      const savedBlog = await blog.save()
      response.status(201).json(blog) //formatNote(blog)
    } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  })

module.exports = blogsRouter