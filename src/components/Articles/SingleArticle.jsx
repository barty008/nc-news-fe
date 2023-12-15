import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, Col, Image, Row } from "react-bootstrap"
import axiosInstance from "../utilities/axios"
import CommentList from "./CommentList"
import CommentForm from "./CommentForm"

const SingleArticle = () => {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [sortByVotes, setSortByVotes] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(`/articles/${articleId}`)
        setArticle(response.data.article)
        setLoading(false)
        setError(null)
      } catch (error) {
        console.error(`Error fetching article with ID ${articleId}:`, error)
        setError("Error fetching the article. Please try again later.")
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!article) {
    return <p key="loading">Article not found.</p>
  }

  const toggleComments = () => {
    setShowComments((prev) => !prev)
  }

  const handleCommentSubmit = (newComment) => {
    console.log("New comment submitted:", newComment)
  }

  return (
    <div className="single-article mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Author: {article.author}
          </Card.Subtitle>
          <Card.Text>{article.body}</Card.Text>
          <Row className="justify-content-center mt-3">
            <Col md={8} className="text-center">
              <Image
                src={article.article_img_url}
                alt={`Image for ${article.title}`}
                fluid
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col md={6} className="text-center">
              <Button
                variant="primary"
                className="mr-2 m-2"
                onClick={toggleComments}
              >
                {showComments ? "Hide Comments" : "Show Comments"}
              </Button>
              <Button
                className="m-2"
                variant="secondary"
                onClick={() => setSortByVotes(!sortByVotes)}
              >
                {sortByVotes ? "Most recent comments" : "Sort by Highest Votes"}
              </Button>
            </Col>
          </Row>

          {showComments && (
            <>
              <CommentForm
                articleId={articleId}
                onCommentSubmit={handleCommentSubmit}
              />
              <CommentList articleId={articleId} sortByVotes={sortByVotes} />
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleArticle
