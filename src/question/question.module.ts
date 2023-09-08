import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { SelectableOption } from '../selectable-option/selectable-option.entity';
import { Answer } from '../answer/answer.entity';
import { ValidateQuestionTypePipe } from './validate-question-type.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Question, SelectableOption, Answer])],
  providers: [QuestionService, ValidateQuestionTypePipe],
  controllers: [QuestionController],
})
export class QuestionModule {}
