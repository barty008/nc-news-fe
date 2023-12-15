import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from "../utilities/axios"
import ArticleCard from "./ArticleCard"

const ArticleList = () => {
  const axiosInstance = axios
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get("/articles")
        setArticles(response.data.articles)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {!loading &&
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
      </Row>
    </Container>
  )
}

export default ArticleList
