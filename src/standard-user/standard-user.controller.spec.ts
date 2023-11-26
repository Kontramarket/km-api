import { Test, TestingModule } from '@nestjs/testing';
import { StandardUserController } from './standard-user.controller';
import { StandardUserService } from './standard-user.service';

describe('StandardUserController', () => {
  let controller: StandardUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandardUserController],
      providers: [StandardUserService],
    }).compile();

    controller = module.get<StandardUserController>(StandardUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
