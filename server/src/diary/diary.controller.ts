import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { DiaryService } from './diary.service';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(@Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(createDiaryDto);
  }

  @Get()
  findAll() {
    return this.diaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDiaryDto: UpdateDiaryDto) {
    return this.diaryService.update(id, updateDiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diaryService.remove(id);
  }

  @Post('user/diaries')
  findAllByUser(@Body('creatorId') creatorId: string) {
    return this.diaryService.findAllByUser(creatorId);
  }
}
