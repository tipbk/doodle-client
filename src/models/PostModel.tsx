import { user } from './UserModel'

export interface PostModel {
    id: string;
    title: string;
    description: string
    hashtag: string;
    user: user
}

export interface PostResponse {
    totalPost: number;
    post: PostModel[];
  }