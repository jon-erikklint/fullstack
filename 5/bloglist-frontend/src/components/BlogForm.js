import React from 'react'

export default class BlogForm extends React.Component{
  createBlog;

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      author: "",
      url: ""
    }

    this.createBlog = props.createBlog
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  submit = async event => {
    event.preventDefault()

    let blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    try {
      this.createBlog(blog)
      this.setState({title: "", author: "", url: ""})
    }catch(exception){
      console.log(exception)
    }
  }

  render() {
    return (
      <form onSubmit={this.submit}>
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
    )
  }
}