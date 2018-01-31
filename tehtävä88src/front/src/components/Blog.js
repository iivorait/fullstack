import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      deleted: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  addLike = () => {
    const blog = this.props.blog
    blog.likes = blog.likes + 1
    blogService.update(blog.id, blog)
    this.forceUpdate()
  }

  remove = () => {
    const blog = this.props.blog
    if (window.confirm('delete ' + blog.title + ' by ' + blog.author + '?')) {
      blogService.remove(blog.id)
      this.setState({
        deleted: true
      })
      this.forceUpdate()
    } 
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    if(this.state.deleted) {
      return (null)
    }

    const DeleteButton = () => {
      if(this.props.user) {
        if(!this.props.blog.user || this.props.user.username === this.props.blog.user.username) {
          return (
           <div>
             <button onClick={this.remove}>delete</button>
           </div>
          )
        }
        return (null)
      }
    }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showWhenVisible}>
            <a href={this.props.blog.url} target="_blank">{this.props.blog.url}</a><br />
            {this.props.blog.likes} likes
            <button onClick={this.addLike}>like</button><br />
            added by {this.props.blog.user ? this.props.blog.user.name : 'unknown soldier'}<br />
            <DeleteButton />
          </div>
      </div>

    ) 
  }
}

export default Blog