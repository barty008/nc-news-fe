import React from "react"
import { Link } from "react-router-dom"
import { Card, Col } from "react-bootstrap"

const ArticleCard = ({ article }) => {
  return (
    <Col md={4} className="mb-4">
      <Card className="article-card">
        <Link to={`/articles/${article.article_id}`} className="text-dark">
          <Card.Img
            variant="top"
            src={article.article_img_url}
            alt="NC News Article Image"
          />
          <Card.Body>
            <Card.Title className="font-weight-bold mb-0">
              {article.title}
            </Card.Title>
            <Card.Text className="text-muted">
              Author: {article.author}
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  )
}

export default ArticleCard
