import { Module } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { CommentsModule } from 'src/comments/comments.module';
import { HistoriesModule } from 'src/histories/histories.module';
import { NotificationModule } from 'src/notification/notification.module';
import { PostsModule } from 'src/posts/posts.module';
import { InfoEntityService } from './info-entity.service';
import { InfoEntityController } from './info-entity.controller';

@Module({
  imports: [
    UserModule,
    NotificationModule,
    InfoEntityModule,
    CommentsModule,
    HistoriesModule,
    PostsModule
  ],
  exports: [InfoEntityModule],
  controllers: [InfoEntityController],
  providers:[InfoEntityService],
})
export class InfoEntityModule {}

