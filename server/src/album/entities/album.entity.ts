import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar') // or 'varchar', based on your preference
  creatorId: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('simple-array', { nullable: true })
  videos: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverPicture: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  albumCategory: string;

  @Column({ type: 'timestamp', nullable: true })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  privacyMode: string;

  @ManyToOne(() => User, (user) => user.albums)
  creator: User;

  @OneToMany(() => Post, (post) => post.album)
  posts: Post[];

  @ManyToMany(() => User)
  @JoinTable() // Necesario para la tabla intermedia de relación
  taggedUsers: User[];
}
