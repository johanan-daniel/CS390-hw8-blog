import { useState } from 'react'
import Nav from '../components/Nav'

export default function CreateBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (!title || !content) {
      console.log('empty request')
      showMessage('empty')
      return
    }

    const headers = { 'content-type': 'application/json' }
    const requestData = JSON.stringify({ title, content })

    console.log('requestData', requestData)

    fetch('http://localhost:3000/blog/create-post', {
      method: 'POST',
      body: requestData,
      headers,
    })
      .then((data) => {
        if (data.ok) {
          console.log('success', data)
          setTitle('')
          setContent('')
          showMessage('success')
        } else {
          console.log('error', data)
          showMessage('error')
        }
      })
      .catch((error) => console.log('error', error))
    console.log('sent: ', requestData)
  }

  const showMessage = (input) => {
    switch (input) {
      case 'success':
        setMessage('Post successfully created')
        break
      case 'empty':
        setError('Fill in all fields')
        break

      default:
        setError('Error in creating post')
        break
    }

    setTimeout(() => {
      setMessage('')
      setError('')
    }, 3000)
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
      <h1>Create Blog Post</h1>
      <form onSubmit={submitHandler}>
        <input onChange={titleHandler} value={title} placeholder="title" />
        <input
          onChange={contentHandler}
          value={content}
          placeholder="content"
        />
        <input type="submit" value="Create post" />
      </form>
      <p className={'msg' + (error ? ' error' : '')}>
        {message}
        {error}
      </p>
    </div>
  )
}
