import React from 'react';
import './Post.css';

interface PostProps {
  title: string;
  description: string;
  username: string;
  hashtag: string;
}

const Post: React.FC<PostProps> = ({ title, description, username, hashtag }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-avatar">
          {/* Replace with an image of the user's avatar */}
          <span role="img" aria-label="User avatar">
            🧑
          </span>
        </div>
        <div className="post-header-info">
        <div className="post-username">@{username} <span className="post-hashtag">#{hashtag}</span></div>
        <div className="post-title">{title}</div>
        <div className="post-description">{description}</div>
        </div>

      </div>
      <div className="post-body">
        
      </div>
    </div>
  );
};

export default Post;
