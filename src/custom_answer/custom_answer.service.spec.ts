import { Test, TestingModule } from '@nestjs/testing';
import { CustomAnswerService } from './custom_answer.service';

describe('CustomAnswerService', () => {
  let service: CustomAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomAnswerService],
    }).compile();

    service = module.get<CustomAnswerService>(CustomAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
