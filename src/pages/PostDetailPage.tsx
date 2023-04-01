import { useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import { PostModel } from "../models/PostModel";
import Post from '../components/Post'

const GET_SINGLE_POST = gql`
  query getPost($input: GetPostInput!) {
    getPost(input: $input) {
      title
      description
      hashtag
      user {
        username
      }
    }
  }
`;

interface GetSinglePostResponse {
    getPost: PostModel;
}

const PostDetailPage: React.FC = () => {
    let { postId } = useParams();
    let id = postId ? postId : ""
    console.log(id)
    const { loading, error, data } = useQuery<GetSinglePostResponse>(GET_SINGLE_POST, {
  variables: { input: { id: id } },
});

      if (loading) return <p>Loading...</p>;
      if (error) {
        console.log(error.message)
        return <p>Error: {error.message}</p>;
      }


      return (
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

        </div>
      );
  };

export default PostDetailPage;