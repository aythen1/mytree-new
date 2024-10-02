import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventsController } from './event.controller';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListItems } from 'src/whish-list-items/entities/whish-list-item.entity';
import { Invitations } from 'src/invitations/entities/invitation.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, WishListItems, Invitations]),
    NotificationModule,
  ],
  controllers: [EventsController],
  providers: [EventService],
  exports: [TypeOrmModule.forFeature([Event])],
})
export class EventModule {}
