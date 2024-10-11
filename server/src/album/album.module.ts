import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), PostsModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService], // Exporta el servicio si necesitas usarlo en otros módulos
})
export class AlbumModule {}
