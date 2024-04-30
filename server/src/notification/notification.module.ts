import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Notification } from './entities/notification.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User,Post,Notification,]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports:[
    TypeOrmModule.forFeature([NotificationModule]),
  ]
})
export class NotificationModule {}
