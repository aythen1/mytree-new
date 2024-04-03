import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Campo para la fecha y hora de creación

    @Column("simple-array")
    photos: string[]; // Suponiendo que las fotos son cadenas que representan las URL de las imágenes

    @ManyToOne(() => User, user => user.notifications)
    user: User;
}
