import React from 'react'
import Togglable from './Togglable'

export default class TogglableWhole extends Togglable {
  constructor(props){
    super(props)

    this.elementStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  }

  inactiveRender = () => {
    return (
      <div className="partly-visible" onClick={this.setActive} style={this.elementStyle}>
        {this.props.children[0]}
      </div>
    )
  }

  activeRender = () => {
    return (
      <div style={this.elementStyle}>
        <div onClick={this.setActive}>
          {this.props.children[0]}
        </div>
        {this.props.children.slice(1)}
      </div>
    )
  }
}