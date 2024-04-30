import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/entities/notification.entity';
import { HistoriesModule } from './histories/histories.module';
import { History } from './histories/entities/history.entity';
import { Comment } from './comments/entities/comment.entity';
import { InfoEntityModule } from './info-entity/info-entity.module';
// import { ChatGateway } from './chat/chat.gateway'; // Asegúrate de importar correctamente tu WebSocketGateway
// import { MessageService } from './chat/service/message.service'; // Asegúrate de importar correctamente tu WebSocketGateway
// import { ChatService } from './chat/service/chat.service'; // Asegúrate de importar correctamente tu WebSocketGateway
// import { MessageEntity } from './chat/entities/message.entity'; // Asegúrate de importar correctamente tu WebSocketGateway
// import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([MessageEntity]),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'azul',
      password: '02030203',      
      database: 'mytree',
      entities: [User , Post,Notification,History,Comment],
      synchronize: true,
    }),


    InfoEntityModule,

    PostsModule,

    CommentsModule,

    UserModule,

    NotificationModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '24h' }, // Cambia según tus necesidades
      }),
      inject: [ConfigService],
    }),
    HistoriesModule,
    // ChatModule

  ],
  controllers: [],
  // providers: [ChatGateway, MessageService, ChatService],
  exports: [],
})
export class AppModule {}
