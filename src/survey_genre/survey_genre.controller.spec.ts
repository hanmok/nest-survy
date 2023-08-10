import { Test, TestingModule } from '@nestjs/testing';
import { SurveyGenreController } from './survey_genre.controller';

describe('SurveyGenreController', () => {
  let controller: SurveyGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyGenreController],
    }).compile();

    controller = module.get<SurveyGenreController>(SurveyGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
