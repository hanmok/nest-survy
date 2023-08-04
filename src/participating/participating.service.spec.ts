import { Test, TestingModule } from '@nestjs/testing';
import { ParticipatingService } from './participating.service';

describe('ParticipateService', () => {
  let service: ParticipatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipatingService],
    }).compile();

    service = module.get<ParticipatingService>(ParticipatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
