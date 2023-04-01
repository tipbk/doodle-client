import React, { useState } from 'react';
import './CreatePostPage.css';
import { PostModel } from '../models/PostModel'
import { useNavigate } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';


// createPost(input: CreatePostInput): Post!
const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`;



interface Post {
  title: string;
  description: string;
  hashtag: string;
}

interface CreatePostResult {
  createPost :PostModel;
}

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({ title: '', description: '', hashtag: '' });
  const [message, setMessage] = useState("")
  const [createPostSuccess, setCreatePostSuccess] = useState(false)

  const [createPost, { loading }] = useMutation<CreatePostResult>(
    CREATE_POST,
    {
      onError: (error) => {
        setMessage(error.message);
      },
      onCompleted: (data) => {
        setCreatePostSuccess(true);
        setMessage("create post successfully.. redirect to post page..");
        setTimeout(() => {
          navigate('/posts/' + data.createPost.id);
        window.location.reload();
        }, 3000);
      },
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (post.title !== "" && post.description !== "" && post.hashtag !== "") {
      let title = post.title
      let description = post.description
      let hashtag = post.hashtag
      createPost({
        variables: {
          input: {
            title,
            description,
            hashtag
          },
        },
      })

        setMessage("create post successfully... redirect to post...")
    } else {
        setMessage("fields cannot be empty")
    }
    console.log(post); // You can replace this with your own implementation to save the post to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={post.description} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="hashtag">Hashtag:</label>
        <input type="text" id="hashtag" name="hashtag" value={post.hashtag} onChange={handleChange} />
      </div>
      <button disabled={loading || createPostSuccess} type="submit">Create Post</button>
      <p>{message}</p>
    </form>
  );
};

export default CreatePostPage;
