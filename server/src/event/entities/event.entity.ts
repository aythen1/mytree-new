import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', nullable: true })
    type: string; // (normal event o special event)
  
    @Column({ type: 'varchar', nullable: true })
    creatorId: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'varchar', nullable: true })
    location: string;
  
    @Column({ type: 'timestamp', nullable: true })
    date: Date;
  
    @Column({ type: 'simple-array', nullable: true })
    invitedUsers: string[];
  
    @Column('jsonb', { nullable: true })
    wishList: any[]; 
  
    @Column({ type: 'boolean', nullable: true })
    shared: boolean;
  
    @Column({ type: 'varchar', nullable: true })
    title: string;

}
