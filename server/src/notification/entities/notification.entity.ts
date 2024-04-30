// notification.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column("simple-array")
  photos: string[];

  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @Column({ type: 'json', default: '{}' })
  extraData: Record<string, any> = {};


}
