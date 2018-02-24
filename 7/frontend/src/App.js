import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Login from './components/Login'

import Users from './components/users/Users'
import OneUser from './components/users/OneUser'

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
              <Router>
                <div>
                  <Route exact path='/' render={
                    () => (<div>
                            <BlogForm/>
                            <BlogList/>
                          </div>)
                  }/>
                  <Route exact path='/users' render={
                    () => (
                      <Users/>
                    )
                  }/>
                  <Route path='/users/:id' render={
                    ({match}) => (<OneUser id={match.params.id}/>)
                  }/>
                </div>
              </Router>
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
