const noNotification = {notification: ''}

const notificationReducer = (state = noNotification, action) => {
  switch(action.type) {
    case 'SET': return {
      notification: action.notification, 
      notificationType: action.notificationType
    }
    case 'UNSET': return noNotification
    default: return state
  }
}

const set = (notification, notificationType) => ({
  type: 'SET',
  notification,
  notificationType
})

const unset = () => ({type: 'UNSET'})

export const notify = (notification, notificationType, time = 5) => {
  return async dispatch => {
    dispatch(set(notification, notificationType))

    await new Promise(resolve => {setTimeout(resolve, time * 1000)})

    dispatch(unset())
  }
}

export default notificationReducer