import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component{
  render() {
    const notification = this.props.notification
    const notificationType = this.props.notificationType
  
    if(!notification) {
      return null
    }
  
    const notificationClass = notificationType 
      ? 'success'
      : 'failure'
  
    return (
      <p className={notificationClass}>
        {notification}
      </p>
    )
  }
}

const mapStateToProps = state => ({
  notification: state.notification.notification,
  notificationType: state.notification.notificationType
})

export default connect(mapStateToProps, null)(Notification)