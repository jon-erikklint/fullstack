const dummy = (blogs) => 1

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum += blog.likes, 0);
}

const mostLiked = blogs => {
  return blogs.length === 0 ? null : blogs.reduce((mostLiked, blog) => blog.likes > mostLiked.likes ? blog : mostLiked);
}

const mostBlogs = blogs => {
  return mostThingsInBlogs(blogs, () => 1, 'blogs')
}

const mostLikes = blogs => {
  return mostThingsInBlogs(blogs, blog => blog.likes, 'likes');
}

const mostThingsInBlogs = (blogs, amountIncrease, amountName) => {
  if(blogs.length === 0) return {[amountName]: 0}

  let amounts = {}
  blogs.forEach(blog => {
    amounts[blog.author] = amounts[blog.author] == null
      ? amountIncrease(blog)
      : amounts[blog.author] + amountIncrease(blog)
  })

  let bloggers = Object.keys(amounts)
  let most = bloggers.reduce((biggestAmount, blogger) => 
    amounts[blogger] > amounts[biggestAmount] ? blogger : biggestAmount)
  
  return {name: most, [amountName]: amounts[most]}
}

module.exports = {
  dummy, totalLikes, mostLiked, mostBlogs, mostLikes
}