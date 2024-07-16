import { Test, TestingModule } from '@nestjs/testing';
import { WhishListItemsService } from './whish-list-items.service';

describe('WhishListItemsService', () => {
  let service: WhishListItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhishListItemsService],
    }).compile();

    service = module.get<WhishListItemsService>(WhishListItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
