import { Answer } from './answer.entity';
import { Module } from '@nestjs/common';
// import { AnswerService as AnswerService } from './answer.service';
import { AnswerService } from './answer.service';
// import { AnswerController as AnswerController } from './answer.controller';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionService } from '../section/section.service';
import { Section } from '../section/section.entity';
import { Question } from '../question/question.entity';
import { QuestionService } from '../question/question.service';
import { SelectableOption } from '../selectable-option/selectable-option.entity';
import { SelectableOptionService } from '../selectable-option/selectable-option.service';
// import { ValidateQuestionTypePipe } from '../question/validate-question-type.pipe';
import { ParticipatingService } from '../participating/participating.service';
import { Participating } from '../participating/participating.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      Section,
      Question,
      SelectableOption,
      Participating,
    ]),
  ],
  providers: [
    AnswerService,
    SectionService,
    QuestionService,
    SelectableOptionService,
    // ValidateQuestionTypePipe,
    ParticipatingService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   // useClass: toSnakeCaseInterceptor,
    // },
  ],
  controllers: [AnswerController],
})
export class AnswerModule {}
