import { Post } from "src/posts/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string[];

  @Column()
  creatorId: string;

  @Column()
  responses: string[];

  @Column()
  likes: string[];

  @Column()
  dislikes: string[];

  @Column()
  extraData: any;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
