import React from 'react';
import './Comment.css';

interface CommentProps {
  comment: string;
  username: string;
}

const Comment: React.FC<CommentProps> = ({ comment, username }) => {
  return (
    <div className="comment">
        <p className="comment-box">
          <span className="comment-username">@{username}: </span>
          <span className="comment-comment">{comment}</span>
        </p>
    </div>
  );
};

export default Comment;
