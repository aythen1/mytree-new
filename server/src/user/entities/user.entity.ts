import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { History } from 'src/histories/entities/history.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ nullable: true })
    profilePicture: string;

    @Column({ nullable: true })
    phone: string;
    @Column({ nullable: true })
    address: string;
    

    @Column({ nullable: true })
    birthDate: string;

    @Column({ nullable: true })
    oldPassword: string; // Para cambio de contraseña, almacenar la clave vieja

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    achievements: string;

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];

    @OneToMany(() => Notification, notification => notification.user)
    notifications: Notification[];

    @Column('simple-array', { nullable: true })
    recentSearches: string[];

    @Column('simple-array', { nullable: true })
    wishList: string[];

    @Column('simple-array', { nullable: true })
    redes: string[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => History, history => history.user)
histories: History[];

   // Nuevas propiedades para la familia
    @Column({ nullable: true })
    momId: string;

    @Column({ nullable: true })
    dadId: string;

    @Column('simple-array', { nullable: true })
    brotherIds: string[];

    @Column('simple-array', { nullable: true })
    unclesIds: string[];

    @Column('simple-array', { nullable: true })
    grandparentsIds: string[];


@OneToMany(() => Comment, comments => comments.user)
comments: Comment[];

    @ManyToMany(() => Post)
    @JoinTable()
    favorites: Post[];

    @ManyToMany(() => Post)
    @JoinTable()
    likedPosts: Post[];

    @Column({ default: false })
    isAdmin: boolean; // Para manejar los roles de administrador

    @Column({ nullable: true })
    googleId: string; // Para manejo de cuenta por terceros de Google Firebase

    @Column({ nullable: true })
    facebookId: string; // Para manejo de cuentas por terceros de Facebook Firebase
}
