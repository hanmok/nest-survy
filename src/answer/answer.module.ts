import { Answer } from './answer.entity';
import { Module } from '@nestjs/common';
// import { AnswerService as AnswerService } from './answer.service';
import { AnswerService } from './answer.service';
// import { AnswerController as AnswerController } from './answer.controller';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionService } from 'src/section/section.service';
import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { SelectableOptionService } from 'src/selectable-option/selectable-option.service';
import { ValidateQuestionTypePipe } from 'src/question/validate-question-type.pipe';
import { ParticipatingService } from 'src/participating/participating.service';
import { Participating } from 'src/participating/participating.entity';

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
    ValidateQuestionTypePipe,
    ParticipatingService,
  ],
  controllers: [AnswerController],
})
export class AnswerModule {}
