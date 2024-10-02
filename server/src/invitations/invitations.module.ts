import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitations } from './entities/invitation.entity';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitations]),
    UserModule,
    EventModule,
    NotificationModule,
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports: [TypeOrmModule.forFeature([Invitations])],
})
export class InvitationsModule {}
