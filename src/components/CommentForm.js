// CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddComment = () => {
    // Validate comment and rating before adding
    if (comment.trim() !== '' && rating > 0 && rating <= 5) {
      // Call the onAddComment prop with the new comment
      onAddComment({ text: comment, rating });
      // Clear the form
      setComment('');
      setRating(0);
    }
  };

  return (
    <div className="add-comment-form">
      <input
        type="text"
        placeholder="Add your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default CommentForm;
