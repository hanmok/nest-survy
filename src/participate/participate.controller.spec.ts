import { Test, TestingModule } from '@nestjs/testing';
import { ParticipateController } from './participate.controller';

describe('ParticipateController', () => {
  let controller: ParticipateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipateController],
    }).compile();

    controller = module.get<ParticipateController>(ParticipateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
