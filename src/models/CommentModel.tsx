import { user } from './UserModel'
import { PostModel } from './PostModel'

export interface CommentModel {
    // id: ID!
    // comment: String!
    // post: Post!
    // replyOn: Comment
    // user: User
    id: string;
    comment: string;
    user: user;
    post: PostModel;
}