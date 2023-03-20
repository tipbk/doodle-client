import { user } from './UserModel'

export interface PostModel {
    id: string;
    title: string;
    description: string
    user: user
}

export interface PostResponse {
    totalPost: number;
    post: PostModel[];
  }