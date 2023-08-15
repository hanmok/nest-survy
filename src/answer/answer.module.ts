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

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Section, Question])],
  providers: [AnswerService, SectionService],
  controllers: [AnswerController],
})
export class AnswerModule {}
