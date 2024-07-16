import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhishListItemsService } from './whish-list-items.service';
import { CreateWhishListItemDto } from './dto/create-whish-list-item.dto';
import { UpdateWhishListItemDto } from './dto/update-whish-list-item.dto';

@Controller('whish-list-items')
export class WhishListItemsController {
  constructor(private readonly whishListItemsService: WhishListItemsService) {}

  @Post()
  create(@Body() createWhishListItemDto: CreateWhishListItemDto) {
    return this.whishListItemsService.create(createWhishListItemDto);
  }

  @Get()
  findAll() {
    return this.whishListItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whishListItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhishListItemDto: UpdateWhishListItemDto) {
    return this.whishListItemsService.update(+id, updateWhishListItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whishListItemsService.remove(+id);
  }
}
