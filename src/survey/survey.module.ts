import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { SurveyGenre } from '../survey_genre/survey_genre.entity';
import { SurveyGenreService } from '../survey_genre/survey_genre.service';
import { PostingService } from '../posting/posting.service';
import { ParticipatingService } from '../participating/participating.service';
import { Posting } from '../posting/posting.entity';
import { Participating } from '../participating/participating.entity';
import { TransactionService } from '../transaction/transaction.service';
import { SectionService } from '../section/section.service';
import { Section } from '../section/section.entity';
import { Question } from '../question/question.entity';
import { QuestionService } from '../question/question.service';
import { SelectableOption } from '../selectable-option/selectable-option.entity';
import { Answer } from '../answer/answer.entity';
import { ValidateQuestionTypePipe } from '../question/validate-question-type.pipe';

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
