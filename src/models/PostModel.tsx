import { user } from './UserModel'
import { CommentModel } from './CommentModel';

export interface PostModel {
    id: string;
    title: string;
    description: string
    hashtag: string;
    user: user
    comment: CommentModel[];
}

export interface PostResponse {
    totalPost: number;
    post: PostModel[];
  }