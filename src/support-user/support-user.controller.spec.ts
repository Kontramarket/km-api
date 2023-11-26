import { Test, TestingModule } from '@nestjs/testing';
import { SupportUserController } from './support-user.controller';
import { SupportUserService } from './support-user.service';

describe('SupportUserController', () => {
  let controller: SupportUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportUserController],
      providers: [SupportUserService],
    }).compile();

    controller = module.get<SupportUserController>(SupportUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
