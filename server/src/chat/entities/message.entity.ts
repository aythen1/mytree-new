import { BaseEntity } from 'src/chat/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity {
  @Column()
  senderId: string; // El ID del remitente del mensaje

  @Column()
  receiverId: string; // El ID del receptor del mensaje

  @Column()
  room: string; // La sala a la que pertenece el mensaje

  @Column()
  message: string; // El contenido del mensaje

  @Column({ default: false })
  isReaded: boolean; // El contenido del mensaje
}