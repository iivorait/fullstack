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

module.exports = {
  dummy,
  totalLikes
}