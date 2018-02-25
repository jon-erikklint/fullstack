import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'

class NavigationBar extends React.Component {
  render () {
    const navbaritemstyle = {
      display: 'inline-block',
      paddingRight: 10
    }

    return (
      <div>
        <div style={navbaritemstyle}>
          <Link to='/'>blogs</Link>
        </div>
        <div style={navbaritemstyle}>
          <Link to='/users'>users</Link>
        </div>
        <div style={navbaritemstyle}>
          <Login></Login>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(NavigationBar)