import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class GroupInfo {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  room: string;
  
  @Column()
  photo: string; 

    
  @Column()
  photos: string[]; 


  @Column()
  groupName: string;
  
  @Column('simple-array')
  membersIds: string[];

  @ManyToMany(() => User, user => user.groups)
  @JoinTable()
  members: User[];
}