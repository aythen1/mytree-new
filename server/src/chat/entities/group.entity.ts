import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class GroupInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true }) 
  room: string;
  
  @Column()
  photo: string; 

    
  @Column('simple-array')
  photos: string[]; 


  @Column()
  groupName: string;
  
  @Column('simple-array')
  membersIds: string[];

  @ManyToMany(() => User, user => user.groups)
  @JoinTable()
  members: User[];
  
}