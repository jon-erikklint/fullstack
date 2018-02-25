import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Blog = ({blog}) => (
  <div className="blog-short">
    <Link to={'/blogs/'+blog._id}>
      {blog.title} {blog.author}
    </Link>
  </div>  
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog