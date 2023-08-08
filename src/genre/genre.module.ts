import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { UserGenre } from 'src/user_genre/user_genre.entity';

import { SurveyGenre } from 'src/survey_genre/survey_genre.entity';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, UserGenre, SurveyGenre])],
  providers: [GenreService , SurveyGenreService],
  controllers: [GenreController]
})
export class GenreModule {}
