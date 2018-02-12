import React from 'react'

class Togglable extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  setActive = () => {
    this.setState({active: !this.state.active})
  }

  render = () => {
    let onActive = {display: this.state.active ? "" : "none"}
    let onInactive = {display: this.state.active ? "none" : ""}

    return (
      <div>
        <div style={onInactive}>
          {this.inactiveRender()}
        </div>
        <div style={onActive}>
          {this.activeRender()}
        </div>
      </div>
    )
  }

  inactiveRender = () => {
    return <button onClick={this.setActive}>{this.props.buttonLabel}</button>
  }

  activeRender = () => {
    return (
      <div>
        {this.props.children}
        <button onClick={this.setActive}>cancel</button>
      </div>)
  }
}

export default Togglable