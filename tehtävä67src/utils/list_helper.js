const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blog) {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let mostLiked = blogs[0]
  blogs.forEach(blog => {
    if(mostLiked.likes < blog.likes) {
      mostLiked = blog
    }
  })
  return mostLiked
}

const mostBlogs = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    let author = authors.find(function(author) {
      if(author.author === blog.author) {
        return author
      }
    })

    if(author === undefined) {
      author = {
        author: blog.author,
        blogs: 1
      }
      authors.push(author)
    } else {
      author.blogs = author.blogs + 1
    }
  })
  
  authors.sort(function(a, b) {
    if(a.blogs > b.blogs) {
      return -1
    } else if (a.blogs < b.blogs) {
      return 1
    }
    return 0
  })

  return authors[0]
}

/* aika copypaste yläpuolelta */
const mostLikes = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    let author = authors.find(function(author) {
      if(author.author === blog.author) {
        return author
      }
    })

    if(author === undefined) {
      author = {
        author: blog.author,
        votes: 0
      }
      authors.push(author)
    }

    author.votes += blog.likes
  })

  authors.sort(function(a, b) {
    if(a.votes > b.votes) {
      return -1
    } else if (a.votes < b.votes) {
      return 1
    }
    return 0
  })
  
  return authors[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}