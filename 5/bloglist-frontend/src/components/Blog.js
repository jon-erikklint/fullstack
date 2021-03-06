import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog}) => (
  <div className="blog-short">
    {blog.title} {blog.author}
  </div>  
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog