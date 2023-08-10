import { Module } from '@nestjs/common';
import { SurveyGenreController } from './survey_genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyGenre } from './survey_genre.entity';
import { SurveyGenreService } from './survey_genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyGenre])],
  providers: [SurveyGenreService],
  controllers: [SurveyGenreController]
})
export class SurveyGenreModule {}
