import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      notification: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  updateBlogList(newBlog) {
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      notification: 'a new blog \'' + newBlog.title + '\' by ' + newBlog.author + ' added'
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  handleFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  login = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        notification: 'username or password wrong',
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    }
  }

  render() {
    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }
      return (
        <div className="notification">
          {message}
        </div>
      )
    }

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification}/>
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
            </div>
            <button>login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={this.state.notification}/>
        <p>
          {this.state.user.name} logged in 
          <button onClick={this.logout}>logout</button>
        </p>

        {<BlogForm updateBlogList={(newBlog) => this.updateBlogList(newBlog)} />}

        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App;
