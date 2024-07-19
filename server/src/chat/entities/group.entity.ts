import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GroupInfo {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  room: string;
  
  @Column()
  photos: string; 


  @Column()
  groupName: string;
  
  @Column('simple-array')
  members: string[];
}