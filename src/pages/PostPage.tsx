import { PostResponse } from '../models/PostModel'
import Post from '../components/Post'
import { useNavigate, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query getAllPostsByFilter($input: PostFilterInput) {
    getAllPostsByFilter(input: $input) {
      totalPost
      post {
        id
        title
        description
        hashtag
        user {
          username
        }
      }
    }
  }
`;

interface PostsData {
    getAllPostsByFilter: PostResponse;
  }

const PostPage = () => {
  const navigate = useNavigate();
    const { loading, error, data } = useQuery<PostsData>(GET_POSTS, {
        variables: { input: { limit: 10, offset: 0 } },
      });

      const handleClickCreatePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/posts/create-post')
      };
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    
      return (
        <div>
          <h2>Posts</h2>
          <button onClick={handleClickCreatePost}>Create Post</button>
          {data?.getAllPostsByFilter?.post.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <Post
          title={post.title}
          description={post.description}
          hashtag={post.hashtag}
          username={post.user.username}
        />
      </Link>
      ))}
        </div>
      );
};

export default PostPage;
