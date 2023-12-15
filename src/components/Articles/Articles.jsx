import React from "react"
import ArticleList from "./ArticleList"
import { Route, Routes } from "react-router-dom"

const ArticlesPage = () => {
  return (
    <div className="articles">
      <h2 className="welcome-article">Welcome to the Articles Page</h2>
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </div>
  )
}

export default ArticlesPage
