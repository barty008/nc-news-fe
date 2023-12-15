import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="nav">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/articles">
          Articles
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation
