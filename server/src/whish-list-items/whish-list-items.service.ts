import { Injectable } from '@nestjs/common';
import { CreateWhishListItemDto } from './dto/create-whish-list-item.dto';
import { UpdateWhishListItemDto } from './dto/update-whish-list-item.dto';

@Injectable()
export class WhishListItemsService {
  create(createWhishListItemDto: CreateWhishListItemDto) {
    return 'This action adds a new whishListItem';
  }

  findAll() {
    return `This action returns all whishListItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whishListItem`;
  }

  update(id: number, updateWhishListItemDto: UpdateWhishListItemDto) {
    return `This action updates a #${id} whishListItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} whishListItem`;
  }
}
