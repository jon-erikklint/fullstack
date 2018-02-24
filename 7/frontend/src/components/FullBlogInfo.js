import React from 'react'

import Blog from './Blog'
import BlogInfo from './BlogInfo'
import TogglableWhole from './TogglableWhole'

const FullBlogInfo = ({blog, deletable, like, deleteBlog}) => 
  (
    <TogglableWhole>
      <Blog blog={blog}/>
      <BlogInfo blog={blog} deletable={deletable} like={like} deleteBlog={deleteBlog}/>
    </TogglableWhole>
  )

export default FullBlogInfo