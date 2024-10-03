import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';

import { ChatController } from './chat.controller';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message.service';
import { GroupInfo } from './entities/group.entity';

import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ChatEntity } from './entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      GroupInfo,
      User,
      Post,
      ChatEntity,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([MessageEntity, ChatEntity]),
    ChatGateway,
    MessageService,
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, MessageService, UserService],
})
export class ChatModule {}
