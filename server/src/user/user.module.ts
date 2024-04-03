import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { History } from 'src/histories/entities/history.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Post,Notification,History,Comment]),
  ],
  controllers: [UserController],
  providers: [UserService], // Incluye UserRepository en la lista de proveedores
})
export class UserModule {}
