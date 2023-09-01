import { Module } from '@nestjs/common';
import { CustomAnswerService } from './custom_answer.service';
import { CustomAnswerController } from './custom_answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomAnswer } from './custom_answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomAnswer])],
  providers: [CustomAnswerService],
  controllers: [CustomAnswerController],
})
export class CustomAnswerModule {}
