import React from 'react'
import {connect} from 'react-redux'

import {notify} from '../reducers/notificationReducer'
import {createBlog} from '../reducers/blogReducer'

class BlogForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  createBlog = async event => {
    event.preventDefault()
    let blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.setState({title: '', author: '', url: ''})
    
    this.props.createBlog(blog)
    this.props.notify(
      `a new blog '${blog.title}' by ${blog.author} created`, 
      true)
  }

  render() {
    return (
      <div>
        <h2>Add blog</h2>
        <form onSubmit={this.createBlog}>
          title:
          <input 
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}/>
          <br/>
          author:
          <input 
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}/>
          <br/>
          url:
          <input 
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}/>
          <br/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default connect(null, {notify, createBlog})(BlogForm)