import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { Card } from "react-bootstrap"

const CommentCard = ({ comment, onDeleteComment }) => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false)
  const isCurrentUserCommentAuthor = comment.author === "cooljmessy"

  const handleDeleteComment = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this comment?"
      )

      if (confirmDelete && !deleteButtonDisabled) {
        setDeleteButtonDisabled(true)

        toast.success("Comment deleted successfully refresh the page!")
      }
    } catch (error) {
      console.error("Error deleting comment:", error)
      // Display error notification
      toast.error("Failed to delete comment. Please try again later.")
    } finally {
      setDeleteButtonDisabled(false)
    }
  }

  return (
    <Card className="comment-card m-4">
      <Card.Body>
        <Card.Text>Author: {comment.author}</Card.Text>
        <Card.Text>{comment.body}</Card.Text>
        {isCurrentUserCommentAuthor && (
          <Button
            variant="danger"
            onClick={handleDeleteComment}
            disabled={deleteButtonDisabled}
          >
            Delete Comment
          </Button>
        )}
        <Card.Text>
          Date: {new Date(comment.created_at).toLocaleString()}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CommentCard
