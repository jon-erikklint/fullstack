import React from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import login from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    let user = window.localStorage.getItem("user")
    if(user) {
      user = JSON.parse(user)

      blogService.setToken(user.token)
      this.setState({user: user})
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({
        username: this.state.username, 
        password: this.state.password
      })
      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({username: "", password: "", user})
    }catch(exception){
      this.setNotification("wrong username or password", "failure")
      console.log(exception)
    }
  }

  logout = (event) => {
    window.localStorage.removeItem("user")
    this.setState({user: null})
  }

  createBlog = async (blog) => {
    const createdBlog = await blogService.create(blog)
    this.setNotification(`a new blog '${createdBlog.title}' by ${createdBlog.author} created`, "success")
    this.setState({blogs: this.state.blogs.concat(createdBlog)})
  }

  setNotification = (error, errorType) => {
    this.setState({error, errorType})
    setTimeout(() => {
      this.setState({error: null, errorType: null})
    }, 3000)
  }

  render() {
    const user = this.state.user
    if(user == null) {
      return (
        <div>
          <Notification error={this.state.error} errorType={this.state.errorType}/>
          <h1>Log in</h1>
          <form onSubmit={this.login}>
            username: 
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}/>
            <br/>
              password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}/>
            <br/>
            <input type="submit"/>
          </form>
        </div>
      )
    }

    return (
      <div>
        <Notification error={this.state.error} errorType={this.state.errorType}/>

        <h2>blogs</h2>
        <p>{user.username} logged in</p>
        <button onClick={this.logout}>logout</button>

        <h2>Add blog</h2>
        <BlogForm createBlog={this.createBlog}/>

        <h2>Blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
