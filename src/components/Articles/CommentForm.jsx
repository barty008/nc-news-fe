import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import axiosInstance from "../utilities/axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CommentForm = ({ articleId, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!commentText.trim()) {
      return toast.error("Please enter a comment before submitting.")
    }

    try {
      setLoading(true)

      const response = await axiosInstance.post(
        `/articles/${articleId}/comments`,
        {
          username: "cooljmessy",
          body: commentText,
        }
      )

      setCommentText("")
      onCommentSubmit(response.data.comment)

      toast.success("Comment submitted successfully refresh the page!")
    } catch (error) {
      console.error("Error submitting comment:", error)
      toast.error("Failed to submit comment. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="commentTextArea">
        <Form.Label>Write your comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Type your comment here..."
          className="form-control"
        />
      </Form.Group>
      <Button
        type="submit"
        disabled={loading}
        style={{ display: "block", margin: "auto" }}
      >
        {loading ? "Submitting..." : "Submit Comment"}
      </Button>

      <ToastContainer />
    </Form>
  )
}

export default CommentForm
