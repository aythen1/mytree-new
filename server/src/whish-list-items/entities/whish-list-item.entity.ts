import { Event } from "src/event/entities/event.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WishListItems {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Event, event => event.wishListItems)
    event: Event;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    takenBy: string; // userId of the person who took the item
}
