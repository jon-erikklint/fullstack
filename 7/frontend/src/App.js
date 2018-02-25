import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import NavigationBar from './components/NavigationBar'

import Users from './components/users/Users'
import OneUser from './components/users/OneUser'

import BlogSite from './components/BlogSite'

import {initBlogs} from './reducers/blogReducer'
import {initUser} from './reducers/loginReducer'
import {initUsers} from './reducers/userReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.initBlogs()
    this.props.initUser()
    this.props.initUsers()
  }

  render() {
    return (
      <div>
        <Notification/>
        <Router>
          <div>
            <NavigationBar/>
            {
              this.props.user 
                ? (
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
                    <Route path='/blogs/:id' render={
                      ({match}) => (<BlogSite id={match.params.id}/>)
                    }/>
                  </div>)
                : null
            }
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {initBlogs, initUser, initUsers})(App)
