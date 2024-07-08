import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('simple-array', { nullable: true })
  taggedUsers: string[];
}
