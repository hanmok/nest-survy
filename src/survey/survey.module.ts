import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { SurveyGenre } from 'src/survey_genre/survey_genre.entity';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { PostService } from 'src/post/post.service';
import { ParticipateService } from 'src/participate/participate.service';
import { PostEntity } from 'src/post/postEntity';
import { Participate } from 'src/participate/participate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, SurveyGenre, PostEntity, Participate])],
  providers: [SurveyService, SurveyGenreService, PostService, ParticipateService],
  controllers: [SurveyController]
})
export class SurveyModule {}
