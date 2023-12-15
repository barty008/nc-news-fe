import React from "react"
import { Route, Routes } from "react-router-dom"

import "./App.css"
import HomePage from "./components/home/Home"
import Navigation from "./components/navigation/Navigation"
import ArticlesPage from "./components/Articles/Articles"
import SingleArticle from "./components/Articles/SingleArticle"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:articleId" element={<SingleArticle />} />
      </Routes>
    </div>
  )
}

export default App
