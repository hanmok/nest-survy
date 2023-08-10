import { Test, TestingModule } from '@nestjs/testing';
import { ParticipatingController } from './participating.controller';

describe('ParticipatingController', () => {
  let controller: ParticipatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipatingController],
    }).compile();

    controller = module.get<ParticipatingController>(ParticipatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
