import React from 'react'
import {connect} from 'react-redux'

import {notify} from '../reducers/notificationReducer'
import {login, logout} from '../reducers/loginReducer'

import Togglable from './Togglable'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  login = async (event) => {
    event.preventDefault()
    
    this.props.login(this.state.username, this.state.password)
    this.setState({username: '', password: ''})
  }

  logout = () => {
    this.props.logout()
  }

  render () {
    const user = this.props.user
    return user
      ? (
        <div>
          <span>{user.username} logged in</span>
          <button onClick={this.logout}>logout</button>
        </div>)
      : (
        <Togglable buttonLabel="log in">
          <h1>Log in</h1>
          <form onSubmit={this.login}>
            username: 
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}/>
            <br/>
              password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}/>
            <br/>
            <input type="submit"/>
          </form>
        </Togglable>)
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {notify, login, logout})(Login)