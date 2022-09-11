import React from 'react'
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
      </div>
    </nav>
  )
}

export default Navbar