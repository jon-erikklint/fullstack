const startNotification = ''

const anecdoteReducer = (state = startNotification, action) => {
  switch(action.type) {
  case 'SET': return action.notification
  case 'UNSET': return ''
  default: return state
  }
}

export const set = notification => ({
  type: 'SET',
  notification
})

export const unset = () => ({ type: 'UNSET' })

export default anecdoteReducer