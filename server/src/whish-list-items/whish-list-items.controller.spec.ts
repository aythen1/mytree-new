import { Test, TestingModule } from '@nestjs/testing';
import { WhishListItemsController } from './whish-list-items.controller';
import { WhishListItemsService } from './whish-list-items.service';

describe('WhishListItemsController', () => {
  let controller: WhishListItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhishListItemsController],
      providers: [WhishListItemsService],
    }).compile();

    controller = module.get<WhishListItemsController>(WhishListItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
