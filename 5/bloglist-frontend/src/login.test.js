import React from 'react'
import {mount} from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogs from './services/blogs'

describe('login tests', () => {
  it('when user is not logged in, only login is shown', () => {
    const app = mount(<App/>)

    const headings = app.find('h1');
    const blogs = app.find(Blog);

    expect(headings.html().includes("Log in")).toBe(true);
    expect(blogs.length).toBe(0);
  })

  it('when user is logged in, all blogs are show', () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    
    localStorage.setItem('user', JSON.stringify(user))

    const app = mount(<App/>)
    /*console.log(app.html())

    const headings = app.find('h1');
    const foundBlogs = app.find(Blog);

    expect(headings.length).toBe(0);
    expect(foundBlogs.length).toBe(blogs.blogs.length)*/
  })
})