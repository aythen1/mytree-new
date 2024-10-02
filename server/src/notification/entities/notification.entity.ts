// notification.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @Column()
  type: string;

  @Column()
  readed: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('simple-array', { nullable: true })
  photos: string[];

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @ManyToOne(() => Post, (post) => post.notifications)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column({ type: 'json', default: '{}' })
  extraData: Record<string, any> = {};

  @Column({ nullable: true })
  relationship: string; // Propiedad opcional para la relación
}
