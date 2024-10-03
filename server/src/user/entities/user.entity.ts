import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { History } from 'src/histories/entities/history.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { GroupInfo } from 'src/chat/entities/group.entity';
import { Invitations } from 'src/invitations/entities/invitation.entity';
import { ChatEntity } from 'src/chat/entities/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
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

  @Column({ nullable: true, default: true })
  newUser: boolean;

  @Column({ nullable: true })
  oldPassword: string; // Para cambio de contraseña, almacenar la clave vieja

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  fixedChat: string;

  @Column({ nullable: true })
  achievements: string;

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @Column('simple-array', { nullable: true })
  recentSearches: string[];

  @Column('simple-array', { nullable: true })
  userCategories: string[];

  @Column('simple-array', { nullable: true })
  wishList: string[];

  @Column('simple-array', { nullable: true })
  redes: string[];

  @Column({ nullable: true })
  maritalStatus: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => History, (history) => history.user)
  histories: History[];

  @OneToMany(() => Invitations, (invitation) => invitation.user)
  invitations: Invitations[];

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

  @Column('simple-array', { nullable: true })
  cousinsIds: string[];

  @Column('simple-array', { nullable: true })
  familyIds: string[];

  @Column('simple-array', { nullable: true })
  friendsIds: string[];

  @ManyToMany(() => User)
  @JoinTable()
  brothers: User[];

  @ManyToMany(() => User)
  @JoinTable()
  cousins: User[];

  @ManyToMany(() => User)
  @JoinTable()
  childrens: User[];

  @ManyToMany(() => User)
  @JoinTable()
  uncles: User[];

  @ManyToMany(() => User)
  @JoinTable()
  grandchildrens: User[];

  @ManyToMany(() => User)
  @JoinTable()
  nephews: User[]; // Relación para los sobrinos

  @OneToMany(() => Comment, (comments) => comments.user)
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

  // @ManyToMany(() => GroupInfo, (group) => group.members)
  // @JoinTable()
  // groups: GroupInfo[];
  @ManyToMany(() => GroupInfo, (group) => group.members)
  groups: GroupInfo[];

  @Column({ nullable: true, default: null })
  badge: string;

  @ManyToMany(() => User)
  @JoinTable()
  closeFriends: User[]; // Amigos íntimos

  @ManyToMany(() => User)
  @JoinTable()
  schoolFriends: User[]; // Amigos de colegio

  @ManyToMany(() => User)
  @JoinTable()
  workFriends: User[]; // Amigos del trabajo

  @ManyToMany(() => User)
  @JoinTable()
  universityFriends: User[]; // Amigos de universidad

  @ManyToMany(() => User)
  @JoinTable()
  hobbyFriends: User[]; // Amigos por afición

  // Relación con los chats donde el usuario es 'userA'
  @OneToMany(() => ChatEntity, (chat) => chat.userA)
  chatsAsUserA: ChatEntity[];

  // Relación con los chats donde el usuario es 'userB'
  @OneToMany(() => ChatEntity, (chat) => chat.userB)
  chatsAsUserB: ChatEntity[];
}
