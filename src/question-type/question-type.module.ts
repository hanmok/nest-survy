import { Module } from '@nestjs/common';
import { QuestionTypeController } from './question-type.controller';
import { QuestionTypeService } from './question-type.service';

@Module({
  controllers: [QuestionTypeController],
  providers: [QuestionTypeService]
})
export class QuestionTypeModule {}
