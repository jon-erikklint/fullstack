import blogService from '../services/blogs'
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

export const initUser = () => {
  return async dispatch => {
    let user = window.localStorage.getItem("user")

    if(user) {
      user = JSON.parse(user)

      blogService.setToken(user.token)

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
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user
      })
    } catch(exception) {
      dispatch(notify("wrong username or password", false))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem("user")
    blogService.setToken(null)

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer