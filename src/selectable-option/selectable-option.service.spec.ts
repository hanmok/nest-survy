import { Test, TestingModule } from '@nestjs/testing';
import { SelectableOptionService } from './selectable-option.service';

describe('SelectableOptionService', () => {
  let service: SelectableOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectableOptionService],
    }).compile();

    service = module.get<SelectableOptionService>(SelectableOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
