import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const combinedReducer = combineReducers({
  notification: notificationReducer,
  user: loginReducer,
  blogs: blogReducer
})

const store = createStore(
  combinedReducer,
  applyMiddleware(thunk)
)

export default store