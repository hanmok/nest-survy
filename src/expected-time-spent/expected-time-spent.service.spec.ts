import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedTimeSpentService } from './expected-time-spent.service';

describe('ExpectedTimeSpentService', () => {
  let service: ExpectedTimeSpentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpectedTimeSpentService],
    }).compile();

    service = module.get<ExpectedTimeSpentService>(ExpectedTimeSpentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
