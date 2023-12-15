// HomePage.jsx
import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import ncImage from "../imgs/homepage.jpg"

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-start">
        <Col md={12} className="text-center mb-4">
          <h1 className="display-4">NC Homepage</h1>
          <p className="lead">
            Welcome to the NC Homepage. Your source for the latest news and
            articles!
          </p>
        </Col>
        <Col md={12} className="text-center">
          <Image className="hero-pic" src={ncImage} alt="NC News" fluid />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
