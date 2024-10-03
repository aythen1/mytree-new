import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity'; // Importa la entidad User
import { MessageEntity } from './message.entity'; // Importa la entidad de mensajes

@Entity({ name: 'chat' })
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  // Relación con el usuario A
  @ManyToOne(() => User, (user) => user.chatsAsUserA)
  userA: User;

  // Relación con el usuario B
  @ManyToOne(() => User, (user) => user.chatsAsUserB)
  userB: User;

  // Relación con los mensajes
  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];
}
