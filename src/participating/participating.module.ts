import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participating } from './participating.entity';
import { ParticipatingService } from './participating.service';
import { ParticipatingController } from './participating.controller';
import { TransactionService } from 'src/transaction/transaction.service';
import { Survey } from 'src/survey/survey.entity';
import { Posting } from 'src/posting/posting.entity';
import { User } from 'src/user/user.entity';
import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { SurveyGenre } from 'src/survey_genre/survey_genre.entity';
import { ExpectedTimeSpent } from 'src/expected-time-spent/ExpectedTimeSpent.entity';
import { SurveyGeo } from 'src/survey_geo/survey-geo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Participating,
      Survey,
      Posting,
      User,
      Section,
      Question,
      SelectableOption,
      SurveyGenre,
      SurveyGeo,
      ExpectedTimeSpent,
    ]),
  ],
  providers: [ParticipatingService, TransactionService],
  controllers: [ParticipatingController],
})
export class ParticipatingModule {}
