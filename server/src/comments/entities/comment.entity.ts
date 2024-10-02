import { v4 as uuidv4 } from 'uuid';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  creatorId: string;

  // Relación con comentario padre
  @ManyToOne(() => Comment, (comment) => comment.responses)
  @JoinColumn({ name: 'parentCommentId' })
  @Transform(({ value }) => value?.id) // Serializa solo el ID del comentario padre
  parentComment: Comment;

  // Relación con respuestas del comentario
  @OneToMany(() => Comment, (comment) => comment.parentComment)
  @Transform(({ value }) =>
    value?.map((c) => ({ id: c.id, content: c.content })),
  ) // Serializa solo algunos campos de las respuestas
  responses: Comment[];

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

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
