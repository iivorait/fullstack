const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if (body.username === undefined || body.username.length < 3) {
        return response.status(400).json({ error: 'username missing or too short' })
    }

    if (body.password === undefined || body.password.length < 3) {
        return response.status(400).json({ error: 'password missing or too short' })
    }

    const usernameCheck = await User.findOne({username: body.username})
    if(usernameCheck !== null) {
        return response.status(400).json({ error: 'username not unique' })
    }

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      adult: user.adult,
      blogs: user.blogs
    }
  }
  
  usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({})
      .populate('blogs', { likes: 1, author: 1, title: 1, url: 1 } )
  
    response.json(users.map(formatUser))
  })

module.exports = usersRouter