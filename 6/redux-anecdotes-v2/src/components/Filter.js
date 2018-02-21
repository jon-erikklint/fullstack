import React from 'react'
import { connect } from 'react-redux'
import { set } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.set(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10,
      marginTop: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(null, { set })(Filter)