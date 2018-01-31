import React from 'react'
class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
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

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showWhenVisible}>
            <a href={this.props.blog.url} target="_blank">{this.props.blog.url}</a><br />
            {this.props.blog.likes} likes
            <button>like</button><br />
            added by {this.props.blog.user ? this.props.blog.user.name : 'unknown soldier'}
          </div>
      </div>

    ) 
  }
}

export default Blog