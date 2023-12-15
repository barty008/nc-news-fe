import React, { useEffect, useState } from "react"
import axiosInstance from "../utilities/axios"
import CommentCard from "./CommentCard"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CommentList = ({ articleId, sortByVotes }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `/articles/${articleId}/comments`
        )
        const sortedComments = sortByVotes
          ? response.data.comments.sort((a, b) => b.votes - a.votes)
          : response.data.comments

        setComments(sortedComments)
        setLoading(false)
        setError(null)
      } catch (error) {
        console.error(
          `Error fetching comments for article ${articleId}:`,
          error
        )
        setError("Error fetching comments. Please try again later.")
        setLoading(false)
      }
    }

    fetchComments()
  }, [articleId, sortByVotes])

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment])

    axiosInstance
      .post(`/articles/${articleId}/comments`, newComment)
      .then((response) => {
        const addedComment = response.data.comment
        console.log("Comment added successfully:", addedComment)

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment === newComment ? addedComment : comment
          )
        )
      })
      .catch((error) => {
        console.error("Error adding comment:", error)

        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== newComment.comment_id
          )
        )
      })
  }

  const handleDeleteComment = (deletedCommentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== deletedCommentId)
    )

    axiosInstance
      .delete(`/comments/${deletedCommentId}`)
      .then(() => {
        toast.success("Comment deleted successfully!")
      })
      .catch((error) => {
        console.error("Error deleting comment:", error)
        // toast.error("Failed to delete comment. Please try again later.")
      })
  }

  if (loading) {
    return <p>Loading comments...</p>
  }

  if (error) {
    return <p className="error-message">{error}</p>
  }

  return (
    <div className="comment-list">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          onDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  )
}

export default CommentList
