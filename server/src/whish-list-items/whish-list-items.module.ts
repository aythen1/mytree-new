import { Module } from '@nestjs/common';
import { WhishListItemsService } from './whish-list-items.service';
import { WhishListItemsController } from './whish-list-items.controller';

@Module({
  controllers: [WhishListItemsController],
  providers: [WhishListItemsService],
})
export class WhishListItemsModule {}
