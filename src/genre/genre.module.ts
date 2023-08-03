import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { User_genre } from 'src/user_genre/user_genre.entity';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { Survey_genre } from 'src/survey_genre/survey_genre.entity';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, User_genre, Survey_genre])],
  providers: [GenreService, UserGenreService, SurveyGenreService],
  controllers: [GenreController]
})
export class GenreModule {}
