export class CreateCommentDto {
  content: string;
  user: number;
  creatorId: string;
  post?: any; // Post es opcional
  postId?: any; // PostId es opcional
}
