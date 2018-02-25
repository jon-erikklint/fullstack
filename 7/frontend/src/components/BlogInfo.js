import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {deleteBlog, likeBlog} from '../reducers/blogReducer'
import {notify} from '../reducers/notificationReducer'

class BlogInfo extends React.Component {
  likeBlog = () => {
    this.props.likeBlog(this.props.blog)
  }

  deleteBlog = () => {
    this.props.deleteBlog(this.props.blog)
    this.props.notify(`blogi ${this.props.blog.title} poistettu`, true)
  }

  isAuthorized = blog => {
    if(!blog.user) return true

    return blog.user.username === this.props.username
  }

  render() {
    const blog = this.props.blog
    const deletable = this.isAuthorized(blog)

    return (
      <div className='blog-long'>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={this.likeBlog}>like</button></div>
        {blog.user ? <div>added by {blog.user.name}</div> : null}
        {deletable ? <button onClick={this.deleteBlog}>delete</button>: null}
      </div>
    )
  }
}

BlogInfo.propTypes = {
  blog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  username: state.user.username
})

export default connect(mapStateToProps, {deleteBlog, likeBlog, notify})(BlogInfo)