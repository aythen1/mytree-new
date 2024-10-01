import { v4 as uuidv4 } from 'uuid';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  creatorId: string;

  @Column('jsonb', { nullable: true, default: '[]' })
  responses: object[];

  @Column('simple-array', { nullable: true })
  likes: string[];

  @Column('simple-array', { nullable: true })
  dislikes: string[];

  @Column('jsonb', { nullable: true })
  extraData: any;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // @ManyToOne(() => User, user => user.comments)
  // user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
