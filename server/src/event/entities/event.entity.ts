import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', nullable: true })
    type: string; // (normal event o special event)
  
    @Column({ type: 'varchar', nullable: true })
    creatorId: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    privacyMode: string;

    @Column({ type: 'text', nullable: true })
    coverImage: string;
  
  
    @Column({ type: 'varchar', nullable: true })
    location: string;
  
    @Column({ type: 'timestamp', nullable: true })
    date: Date;
  
    @Column({ type: 'simple-array', nullable: true })
    invitedUsers: string[];

    @Column({ type: 'simple-array', nullable: true })
    images: string[];
  
    @Column('jsonb', { nullable: true })
    wishList: any[]; 
  
    @Column({ type: 'boolean', nullable: true })
    shared: boolean;
  
    @Column({ type: 'varchar', nullable: true })
    title: string;

    @Column('jsonb', { nullable: true })
    extraData: any;

}
