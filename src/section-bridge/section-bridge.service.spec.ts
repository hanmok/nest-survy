import { Test, TestingModule } from '@nestjs/testing';
import { SectionBridgeService } from './section-bridge.service';

describe('SectionBridgeService', () => {
  let service: SectionBridgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionBridgeService],
    }).compile();

    service = module.get<SectionBridgeService>(SectionBridgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
