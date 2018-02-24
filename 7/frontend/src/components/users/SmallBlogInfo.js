import React from 'react'

const SmallBlogInfo = ({blog}) => {console.log(blog);return(
  <li>
    {`${blog.title} by ${blog.author}`}
  </li>
)}

export default SmallBlogInfo