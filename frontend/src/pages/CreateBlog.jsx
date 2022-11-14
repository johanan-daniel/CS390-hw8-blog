import { useState } from 'react'
import Nav from '../components/Nav'

export default function CreateBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    const headers = { 'content-type': 'application/json' }
    const requestData = JSON.stringify({ title, content })

    console.log('requestData', requestData)

    fetch('http://localhost:3000/blog/create-post', {
      method: 'POST',
      body: requestData,
      headers,
    })
      .then((data) => console.log('success', data))
      .catch((error) => console.log('error', error))
    console.log('sent: ', requestData)
  }

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const contentHandler = (e) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <Nav />
      <h1>asdf</h1>
      <form onSubmit={submitHandler}>
        <input onChange={titleHandler} value={title} placeholder="title" />
        <input
          onChange={contentHandler}
          value={content}
          placeholder="content"
        />
        <input type="submit" value="Create post" />
      </form>
    </div>
  )
}
