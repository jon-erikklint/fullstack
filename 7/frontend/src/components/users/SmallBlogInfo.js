import React from 'react'

const SmallBlogInfo = ({blog}) => {(
  <li>
    {`${blog.title} by ${blog.author}`}
  </li>
)}

export default SmallBlogInfo