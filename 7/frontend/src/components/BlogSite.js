import React from 'react'
import {connect} from 'react-redux'

import {likeBlog} from '../reducers/blogReducer'

class BlogSite extends React.Component {
  likeBlog = () => {
    this.props.likeBlog(this.props.blog)
  }

  render () {
    const blog = this.props.blog
    return (
      <div>
        <h2>{blog.title + ' ' + blog.author}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={this.likeBlog}>like</button></div>
        {blog.user ? <div>added by {blog.user.name}</div> : null}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog._id === ownProps.id)
})

export default connect(mapStateToProps, {likeBlog})(BlogSite)