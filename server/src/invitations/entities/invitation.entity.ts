import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invitations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, (event) => event.invites)
  event: Event;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => User, (user) => user.invitations)
  user: User;

  @Column({ type: 'varchar', default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';
}
