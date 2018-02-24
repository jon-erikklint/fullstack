import React from 'react'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import FullBlogInfo from './components/FullBlogInfo'

import blogService from './services/blogs'
import login from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: "",
      password: "",
      user: null
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
    console.log(error, errorType)
    this.setState({error, errorType})
    setTimeout(() => {
      this.setState({error: null, errorType: null})
    }, 3000)
  }

  likeBlog = blog => async () => {
    const newBlog = {...blog, likes: blog.likes + 1}
    try {
      await blogService.update(newBlog)

      this.setState(
        {
          blogs: this.state.blogs
            .map(blog => blog._id === newBlog._id ? newBlog : blog)
        }
      )
    }catch(exception){
      this.setNotification(`virhe: ${exception}`, 'failure')
    }
  }

  deleteBlog = blog => async () => {
    if(!window.confirm(`delete blog: ${blog.title}?`)) return
    try {
      await blogService.delete(blog)

      this.setState(
        {
          blogs: this.state.blogs
            .filter(b => b._id !== blog._id)
        }
      )
    }catch(exception){
      this.setNotification(`sinulla ei ole oikeuksia blogin poistamiseen`, 'failure')
    }
  }

  isAuthorized = blog => {
    if(!blog.user) return true

    return blog.user.username === this.state.user.username
  }

  render() {
    const user = this.state.user

    if(!user) return (
      <div>
        <Notification error={this.state.error} errorType={this.state.errorType}/>

        <Togglable buttonLabel="log in">
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
        </Togglable>
      </div>
    );

    return (
      <div>
        <Notification error={this.state.error} errorType={this.state.errorType}/>
        <p>{user.username} logged in</p>
        <button onClick={this.logout}>logout</button>

        <h2>Add blog</h2>
        <BlogForm createBlog={this.createBlog}/>

        <h2>Blogs</h2>
        {this.state.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
          <FullBlogInfo 
            key={blog._id}
            blog={blog}
            deletable={this.isAuthorized(blog)}
            like={this.likeBlog(blog)} 
            deleteBlog={this.deleteBlog(blog)}/>
          ))}
      </div>
    )
  }
}

export default App;
