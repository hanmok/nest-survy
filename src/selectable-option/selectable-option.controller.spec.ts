import { Test, TestingModule } from '@nestjs/testing';
import { SelectableOptionController } from './selectable-option.controller';

describe('SelectableOptionController', () => {
  let controller: SelectableOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectableOptionController],
    }).compile();

    controller = module.get<SelectableOptionController>(SelectableOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
