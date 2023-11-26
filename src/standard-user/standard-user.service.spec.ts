import { Test, TestingModule } from '@nestjs/testing';
import { StandardUserService } from './standard-user.service';

describe('StandardUserService', () => {
  let service: StandardUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardUserService],
    }).compile();

    service = module.get<StandardUserService>(StandardUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
