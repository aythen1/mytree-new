import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventsController } from './event.controller';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [EventsController],
  providers: [EventService],
  exports:[TypeOrmModule.forFeature([Event])]
})
export class EventModule {}
