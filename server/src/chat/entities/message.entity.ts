import { Entity, Column, PrimaryGeneratedColumn ,CreateDateColumn, UpdateDateColumn} from 'typeorm';

export enum DeleteStatus {
  TRUE = 'true',
  FALSE = 'false',
  NULL = 'null',
}


@Entity({ name: 'message' })
export class MessageEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;


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

  @Column({ nullable: true })
  type: string;

  @Column({ default: null, nullable: true })
  senderDelete: boolean; // Estado de eliminación del mensaje para el remitente

  @Column({ default: null, nullable: true })
  receiverDelete: boolean; // Estado de eliminación del mensaje para el receptor
  // Propiedades flexibles
  @Column({ type: 'json', nullable: true })
  prop1: Record<string, any> | null;

  @Column({ type: 'json', nullable: true })
  prop2: Record<string, any> | null;

  @Column({ type: 'simple-array', nullable: true })
  prop3: string[] | null;

  @Column({ type: 'simple-array', nullable: true })
  prop4: string[] | null;
}