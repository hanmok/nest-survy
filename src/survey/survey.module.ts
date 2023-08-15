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
import { SectionService } from 'src/section/section.service';
import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { Answer } from 'src/answer/answer.entity';
import { ValidateQuestionTypePipe } from 'src/question/validate-question-type.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Survey,
      SurveyGenre,
      Posting,
      Participating,
      Section,
      Question,
      SelectableOption,
      Answer,
    ]),
  ],
  providers: [
    SurveyService,
    SurveyGenreService,
    PostingService,
    ParticipatingService,
    TransactionService,
    SectionService,
    QuestionService,
    ValidateQuestionTypePipe,
  ],
  controllers: [SurveyController],
})
export class SurveyModule {}
