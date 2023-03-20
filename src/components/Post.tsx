import React from 'react';

interface PostProps {
  title: string;
  description: string;
  username: string;
}

const Post: React.FC<PostProps> = ({ title, description, username }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>by {username}</p>
    </div>
  );
};

export default Post;