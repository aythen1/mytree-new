import { v4 as uuidv4 } from 'uuid'; 
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  creatorId: string;

  @Column('simple-array', { nullable: true })
  responses: string[];

  @Column('simple-array', { nullable: true })
  likes: string[];

  @Column('simple-array', { nullable: true })
  dislikes: string[];

  @Column('simple-array',{ nullable: true })
  extraData: any;

  // @ManyToOne(() => User, user => user.comments)
  // user: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
