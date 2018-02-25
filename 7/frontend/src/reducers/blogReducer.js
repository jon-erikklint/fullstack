import blogService from '../services/blogs'

import {notify} from './notificationReducer'

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT-BLOGS': return action.blogs
  case 'CREATE': return state.concat(action.blog)
  case 'DELETE': return state.filter(blog => blog._id !== action.blog._id)
  case 'UPDATE': return state.map(blog => blog._id !== action.blog._id
    ? blog
    : action.blog
  )
  default: return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()

      dispatch({
        type: 'INIT-BLOGS',
        blogs
      })
    } catch(excpetion) {
      dispatch(notify('blog initialization failed', false))
    }
  }
}

export const createBlog = toAdd => {
  return async dispatch => {
    try {
      const blog = await blogService.create(toAdd)

      dispatch({
        type: 'CREATE',
        blog
      })
    } catch(exception) {
      dispatch(notify('virhe blogin luonnissa', false))
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.delete(blog)

      dispatch({
        type: 'DELETE',
        blog
      })
    } catch(exception) {
      dispatch(notify('sinulla ei ole oikeuksia blogin poistamiseen', false))
    }
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    try {
      await blogService.update(blog)

      dispatch({
        type: 'UPDATE',
        blog
      })
    } catch(exception) {
      dispatch(notify('virhe blogin päivityksessä', false))
    }
  }
}

export const likeBlog = blog => {
  return updateBlog({...blog, likes: blog.likes + 1})
}

export default blogReducer