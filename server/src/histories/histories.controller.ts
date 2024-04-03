import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }

  @Get()
  findAll() {
    return this.historiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiesService.findOne(+id);
  }
  @Get('/user/:userId')
  findAllByUser(@Param('userId') userId: any) {
    return this.historiesService.findAllByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(+id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiesService.remove(+id);
  }
}
