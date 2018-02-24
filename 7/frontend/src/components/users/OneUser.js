import React from 'react'
import {connect} from 'react-redux'

import SmallBlogInfo from './SmallBlogInfo'

class OneUser extends React.Component {
  render () {
    const user = this.props.user
    console.log(user)
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        {
          user.blogs.length > 0 
            ? (
              <ul>
               {user.blogs.map(blog => (<SmallBlogInfo blog={blog} key={blog._id}/>))}
              </ul>
            )
            : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(user => user.id === ownProps.id)
})

export default connect(mapStateToProps, null)(OneUser)