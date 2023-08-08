import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { Response } from 'src/response/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, SelectableOption, Response])],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}
