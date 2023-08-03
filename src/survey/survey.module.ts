import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Survey_genre } from 'src/survey_genre/survey_genre.entity';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { PostService } from 'src/post/post.service';
import { ParticipateService } from 'src/participate/participate.service';
import { Post } from 'src/post/post.entity';
import { Participate } from 'src/participate/participate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Survey_genre, Post, Participate])],
  providers: [SurveyService, SurveyGenreService, PostService, ParticipateService],
  controllers: [SurveyController]
})
export class SurveyModule {}
