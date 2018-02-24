import blogService from '../services/blogs'
import userService from '../services/users'
import loginService from '../services/login'

import {notify} from './notificationReducer'

const defaultState = null

const loginReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOGIN': return action.user
    case 'LOGOUT': return defaultState
    default: return state
  }
}

const setToken = token => {
  blogService.setToken(token)
  userService.setToken(token)
}

export const initUser = () => {
  return async dispatch => {
    let user = window.localStorage.getItem("user")

    if(user) {
      user = JSON.parse(user)

      setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem("user", JSON.stringify(user))
      setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user
      })
    } catch(exception) {
      console.log(exception)
      dispatch(notify("wrong username or password", false))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem("user")
    setToken(null)

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer