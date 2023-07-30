import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { QuestionModule } from './question/question.module';
import { SectionModule } from './section/section.module';
import { SurveyModule } from './survey/survey.module';
import { ResponseModule } from './response/response.module';
import { SegmentModule } from './segment/segment.module';

@Module({
  imports: [UserModule, GenreModule, QuestionModule, SectionModule, SurveyModule, ResponseModule, SegmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
