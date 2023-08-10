import { Test, TestingModule } from '@nestjs/testing';
import { SectionBridgeController } from './section-bridge.controller';

describe('SectionBridgeController', () => {
  let controller: SectionBridgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionBridgeController],
    }).compile();

    controller = module.get<SectionBridgeController>(SectionBridgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
