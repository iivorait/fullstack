const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const formatBlog = (blog) => {
    return {
      id: blog._id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user
    }
  }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 } )
    response.json(blogs.map(formatBlog)) 
})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.title === undefined || body.url === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }

        // const user = await User.findById(body.userId)
        const users = await User.find({})
        const user = users[0]

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(blog) //formatNote(blog)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)

        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id', (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogsRouter