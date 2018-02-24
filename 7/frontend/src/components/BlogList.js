import React from 'react'
import {connect} from 'react-redux'

import FullBlogInfo from './FullBlogInfo'

class BlogList extends React.Component {
  render() {
    return (
      <div>
      <h2>Blogs</h2>
      {this.props.blogs
        .map(blog => (
        <FullBlogInfo 
          key={blog._id}
          blog={blog}/>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
  blogs: state.blogs.sort((a, b) => b.likes - a.likes)
})
};

export default connect(mapStateToProps, null)(BlogList)