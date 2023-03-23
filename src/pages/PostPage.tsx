import { gql, useQuery } from '@apollo/client';
import { PostResponse } from '../models/PostModel'
import Post from '../components/Post'

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
    const { loading, error, data } = useQuery<PostsData>(GET_POSTS, {
        variables: { input: { limit: 10, offset: 0 } },
      });
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    
      return (
        <div>
          <h2>Posts</h2>
          {data?.getAllPostsByFilter?.post.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          description={post.description}
          hashtag={post.hashtag}
          username={post.user.username}
        />
      ))}
        </div>
      );
};

export default PostPage;
