import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';

import { ChatController } from './chat.controller';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message.service';
import { GroupInfo } from './entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]),
   TypeOrmModule.forFeature([GroupInfo]), // Incluye GroupInfoRepository
   GroupInfo],
  exports:[TypeOrmModule.forFeature([MessageEntity])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, MessageService]
})
export class ChatModule {}
