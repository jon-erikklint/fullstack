import React from 'react'
import {connect} from 'react-redux'

import {initUsers} from '../../reducers/userReducer'

import UserInfo from './UserInfo'

class Users extends React.Component {
  componentDidMount() {
    this.props.initUsers()
  }

  render() {
    return (
      <div>
        <h2>users</h2>
        <table>
          <tbody>
            <tr><th></th><th>blogs added</th></tr>
            {this.props.users.map(user => (
              <UserInfo user={user} key={user.id}/>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, {initUsers})(Users)