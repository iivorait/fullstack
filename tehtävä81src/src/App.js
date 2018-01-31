import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: '',
      username: '',
      password: '',
      user: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  login = (e) => {
    e.preventDefault()
    console.log('login in with', this.state.username, this.state.password)
  }

  handleLoginFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  login = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'username or password wrong',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
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
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App;
