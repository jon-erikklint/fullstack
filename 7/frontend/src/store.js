import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const combinedReducer = combineReducers({
  notification: notificationReducer,
  user: loginReducer,
  users: userReducer,
  blogs: blogReducer
})

const store = createStore(
  combinedReducer,
  applyMiddleware(thunk)
)

export default store