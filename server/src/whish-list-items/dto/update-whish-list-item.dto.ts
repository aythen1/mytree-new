import { PartialType } from '@nestjs/mapped-types';
import { CreateWhishListItemDto } from './create-whish-list-item.dto';

export class UpdateWhishListItemDto extends PartialType(CreateWhishListItemDto) {
    takenBy: string;
}
