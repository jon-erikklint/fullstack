import userService from '../services/users'

import {notify} from './notificationReducer'

const initial = []

const userReducer = (state = initial, action) => {
  switch(action.type) {
  case 'INIT-USERS': return action.users
  default: return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()

      dispatch({
        type: 'INIT-USERS',
        users
      })
    } catch(exception) {
      dispatch(notify('virhe hakiessa käyttäjiä'))
    }
  }
}

export default userReducer