import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combinedRecuder = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(combinedRecuder)

export default store