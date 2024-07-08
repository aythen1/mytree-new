import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { Diary } from '../diary/entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
