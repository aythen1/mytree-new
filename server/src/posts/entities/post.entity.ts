import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameUser: string;

    @Column()
    description: string;

    @Column("simple-array")
    photos: string[]; // Suponiendo que las fotos son cadenas que representan las URL de las imágenes

    @ManyToMany(() => User)
    @JoinTable()
    etiquets: User[]; // Suponiendo que User es la clase que representa a un usuario

    @Column()
    fecha: string;

    @Column()
    privacyMode: string;

    @Column("simple-array", { nullable: true })
    hashtags: string[];

    @Column("simple-array", { nullable: true })
    albums: string[];

    @Column("simple-array", { nullable: true })
    tags: string[];


    @ManyToOne(() => User, user => user.posts)
    user: User;
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]; // Relación One-to-Many con los comentarios del post

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}