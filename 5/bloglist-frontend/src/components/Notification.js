import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({error, errorType}) => {
  if(error == null) {
    return null
  }

  return (
    <p className={errorType}>
      {error}
    </p>
  )
}

Notification.propTypes = {
  error: PropTypes.string,
  errorType: PropTypes.string
}

export default Notification