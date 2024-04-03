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

@Module({
  imports: [
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

  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
