import { Test, TestingModule } from '@nestjs/testing';
import { SurveyGeoController } from './survey_geo.controller';

describe('SurveyGeoController', () => {
  let controller: SurveyGeoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyGeoController],
    }).compile();

    controller = module.get<SurveyGeoController>(SurveyGeoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
