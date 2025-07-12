export interface Comment {
  id: number;
  text: string;
  createdAt: string; // or Date
  user: {
    id: number;
    username: string;
  };
  post: {
    id: number;
  };
}
