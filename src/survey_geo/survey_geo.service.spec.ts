import { Test, TestingModule } from '@nestjs/testing';
import { SurveyGeoService } from './survey_geo.service';

describe('SurveyGeoService', () => {
  let service: SurveyGeoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyGeoService],
    }).compile();

    service = module.get<SurveyGeoService>(SurveyGeoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
