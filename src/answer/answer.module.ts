import { Answer } from './answer.entity';
import { Module } from '@nestjs/common';
// import { AnswerService as AnswerService } from './answer.service';
import { AnswerService } from './answer.service';
// import { AnswerController as AnswerController } from './answer.controller';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
