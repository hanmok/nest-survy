import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { SurveyGenre } from 'src/survey_genre/survey_genre.entity';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { Posting } from 'src/posting/posting.entity';
import { Participating } from 'src/participating/participating.entity';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, SurveyGenre, Posting, Participating])],
  providers: [SurveyService, SurveyGenreService, PostingService, ParticipatingService, TransactionService],
  controllers: [SurveyController]
})
export class SurveyModule {}
