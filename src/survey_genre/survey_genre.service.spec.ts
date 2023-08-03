import { Test, TestingModule } from '@nestjs/testing';
import { SurveyGenreService } from './survey_genre.service';

describe('SurveyGenreService', () => {
  let service: SurveyGenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyGenreService],
    }).compile();

    service = module.get<SurveyGenreService>(SurveyGenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
