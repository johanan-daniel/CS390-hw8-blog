import React, { useState } from 'react'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import '../styles/BlogsView.css'

const BlogsView = () => {
  const [data, setData] = useState('')
  const [postToEdit, setPostToEdit] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('password123')

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

  const clickHandler = (item) => {
    console.log('index', item)
    setTitle(item.title)
    setContent(item.content)
    setPostToEdit(item._id)
  }

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const contentHandler = (e) => {
    setContent(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (!title || !content || !password) {
      console.log('empty request')
      showMessage('empty')
      return
    }

    if (password !== 'password123') {
      showMessage('invalid password')
      return
    }

    const headers = { 'content-type': 'application/json' }
    const requestData = JSON.stringify({ title, content, id: postToEdit })

    fetch('http://localhost:3000/blog/edit-post', {
      method: 'PUT',
      body: requestData,
      headers,
    })
      .then((data) => {
        if (data.ok) {
          setTitle('')
          setContent('')
          showMessage('success')
          setPostToEdit('')
          return data.json()
        } else {
          showMessage('error')
          return data.text().then((text) => Promise.reject(text))
        }
      })
      .then((res) => {
        setData(res)
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }

  const renderList = () => {
    if (data) {
      return data.map((item) => {
        let row

        if (postToEdit === item._id) {
          row = (
            <form onSubmit={submitHandler} key={item._id}>
              <input value={title} onChange={titleHandler} />
              <input value={content} onChange={contentHandler} />
              <input type="submit" value="done" />
            </form>
          )
        } else {
          row = (
            <p key={item._id}>
              {item.title}: {item.content}
              <button className="edit" onClick={() => clickHandler(item)}>
                edit
              </button>
            </p>
          )
        }

        return row
      })
    }
  }

  return (
    <div className="blogsView">
      <Nav />
      <h1>My Blogs</h1>
      {renderList()}
    </div>
  )
}

export default BlogsView
