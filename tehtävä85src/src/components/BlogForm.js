import React from 'react'
import Blog from './Blog'
import App from '../App'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    addBlog = (e) => {
        e.preventDefault()
        const blogObject = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        }

        blogService
            .create(blogObject)
            .then(newBlog => {
                this.props.updateBlogList(newBlog)
                this.setState({
                    title: '',
                    author: '',
                    url: ''
                })
            })
    }

    handleFieldChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }

    render() {
        return (
            < div >
                <h3>create new</h3>

                <form onSubmit={this.addBlog}>
                    title
                    <input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleFieldChange}
                    />
                    <br />
                    author
                    <input
                        name="author"
                        value={this.state.author}
                        onChange={this.handleFieldChange}
                    />
                    <br />
                    url
                    <input
                        name="url"
                        value={this.state.url}
                        onChange={this.handleFieldChange}
                    />
                    <br />
                    <button>create</button>
                </form>
                <br />
            </div>
        )
    }
}
export default BlogForm