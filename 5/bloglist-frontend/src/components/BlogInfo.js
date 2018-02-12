import React from 'react'
import PropTypes from 'prop-types'

const BlogInfo = ({blog, deletable, like, deleteBlog}) => (
  <div>
    <a href={blog.url}>{blog.url}</a>
    <div>{blog.likes} likes <button onClick={like}>like</button></div>
    {blog.user ? <div>added by {blog.user.name}</div> : null}
    {deletable ? <button onClick={deleteBlog}>delete</button>: null}
  </div>
)

BlogInfo.propTypes = {
  blog: PropTypes.object.isRequired,
  deletable: PropTypes.bool.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogInfo