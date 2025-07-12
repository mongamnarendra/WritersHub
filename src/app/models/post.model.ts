import { Comment } from './comment.model';
import { User } from './user.model';

export interface Post {
  id?: number;
  content: string;
  createdAt?: Date;
  author?: User;
  likedUsers?: User[];
  comments?: Comment[];
}
