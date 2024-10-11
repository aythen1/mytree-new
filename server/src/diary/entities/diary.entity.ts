import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('simple-array', { nullable: true })
  videos: string[];

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  privacyMode: string;

  @Column('simple-array', { nullable: true })
  taggedUsers: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column('varchar') // or 'varchar', based on your preference
  creatorId: string;

  // Relación con el usuario creador del diario
  @ManyToOne(() => User, (user) => user.diaries)
  creator: User;
}
