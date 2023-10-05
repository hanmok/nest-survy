import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedTimeSpentController } from './expected-time-spent.controller';

describe('ExpectedTimeSpentController', () => {
  let controller: ExpectedTimeSpentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedTimeSpentController],
    }).compile();

    controller = module.get<ExpectedTimeSpentController>(ExpectedTimeSpentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
