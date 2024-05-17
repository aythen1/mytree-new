import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameUser: string;

  @Column()
  description: string;

  @Column()
  media: string; // Suponiendo que las fotos son cadenas que representan las URL de las imágenes

  @ManyToMany(() => User)
  @JoinTable()
  etiquets: User[]; // Suponiendo que User es la clase que representa a un usuario

  @Column()
  fecha: string;

  @Column('simple-array', { nullable: true })
  hashtags: string[];

  @ManyToOne(() => User, (user) => user.histories)
  user: User;
}
