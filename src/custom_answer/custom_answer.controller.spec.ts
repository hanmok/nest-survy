import { Test, TestingModule } from '@nestjs/testing';
import { CustomAnswerController } from './custom_answer.controller';

describe('CustomAnswerController', () => {
  let controller: CustomAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomAnswerController],
    }).compile();

    controller = module.get<CustomAnswerController>(CustomAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
