import React from 'react'
import { connect } from 'react-redux'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Login from './components/Login'

import {initBlogs} from './reducers/blogReducer'
import {initUser} from './reducers/loginReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.initBlogs()
    this.props.initUser()
  }

  render() {
    return (
      <div>
        <Notification/>
        <Login/>
        {
          this.props.user 
            ? (
              <div>
                <BlogForm/>
                <BlogList/>
              </div>
              )
            : null
        }
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {initBlogs, initUser})(App);
