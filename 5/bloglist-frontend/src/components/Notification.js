import React from 'react'

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

export default Notification