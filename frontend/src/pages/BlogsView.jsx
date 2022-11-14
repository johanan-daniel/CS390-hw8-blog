import React, { useState } from 'react'
import { useEffect } from 'react'
import Nav from '../components/Nav'

const BlogsView = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    const headers = { 'content-type': 'application/json' }

    fetch('http://localhost:3000/blog', {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res)
      })
      .catch((error) => console.log('error', error))
  }, [])

  return (
    <div>
      <Nav />
      <h1>My Blogs</h1>
      {data && data.map((item) => <p key={item._id}>{item.title}</p>)}
    </div>
  )
}

export default BlogsView
