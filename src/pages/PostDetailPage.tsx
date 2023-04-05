import { useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import { PostModel } from "../models/PostModel";
import Post from '../components/Post'
import React, { useState } from 'react';
import Comment from "../components/Comment";

const GET_SINGLE_POST = gql`
  query getPost($input: GetPostInput!) {
    getPost(input: $input) {
      title
      description
      hashtag
      user {
        username
      }
      comment {
        id
        comment
        user {
          username
        }
      }
    }
  }
`;

interface GetSinglePostResponse {
    getPost: PostModel;
}

const PostDetailPage: React.FC = () => {
    let { postId } = useParams();
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("")
    let id = postId ? postId : ""
    const { loading, error, data } = useQuery<GetSinglePostResponse>(GET_SINGLE_POST, {
  variables: { input: { id: id } },
});

      if (loading) return <p>Loading...</p>;
      if (error) {
        console.log(error.message)
        return <p>Error: {error.message}</p>;
      }

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("comment added. reloading page...")
        setTimeout(() => {
          
        window.location.reload();
        }, 3000);
      };


      return (
        <div>
        <div>
          <h2>Post</h2>
        <Post
          key={data?.getPost.id}
          title={data?.getPost.title ? data?.getPost.title : "N/A"}
          description={data?.getPost.description ? data?.getPost.description : "N/A"}
          hashtag={data?.getPost.hashtag ? data?.getPost.hashtag : "N/A"}
          username={data?.getPost.user?.username ? data?.getPost.user?.username : "N/A"}
        />
        <h3>Comments</h3>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Add you comment here:</label>
        <input type="text" id="comment" name="comment" value={comment} onChange={e => setComment(e.target.value)} />
      </div>
      <button disabled={loading} type="submit">Add Comment</button>
    </form>
    <p>{message}</p>
        </div>
        {data?.getPost?.comment.map((comment) => (
        <Comment key={comment.id}
          username={comment.user.username}
          comment={comment.comment}
        />
      ))}
        </div>
      );
  };

export default PostDetailPage;