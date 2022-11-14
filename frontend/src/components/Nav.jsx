import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

const Nav = () => {
  return (
    <nav>
      <Link to={'/'}>My Blogs</Link>
      <Link to={'/create'}>Create Blog</Link>
    </nav>
  )
}

export default Nav
