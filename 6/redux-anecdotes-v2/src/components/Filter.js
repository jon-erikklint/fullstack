import React from 'react'
import { set } from '../reducers/filterReducer'

export default class Filter extends React.Component {
  handleChange = (event) => {
    this.props.store.dispatch(set(event.target.value))
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