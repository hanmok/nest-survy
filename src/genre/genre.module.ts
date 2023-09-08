import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
// import { UserGenre } from '../user_genre/user_genre.entity';
import { UserGenre } from '../user_genre/user_genre.entity';

import { SurveyGenre } from '../survey_genre/survey_genre.entity';
import { SurveyGenreService } from '../survey_genre/survey_genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, UserGenre, SurveyGenre])],
  providers: [GenreService, SurveyGenreService],
  controllers: [GenreController],
})
export class GenreModule {}
