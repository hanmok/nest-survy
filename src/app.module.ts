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
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './user/auth.service';
import { SelectableOptionModule } from './selectable-option/selectable-option.module';
import { SectionBridgeModule } from './section-bridge/section-bridge.module';
import { QuestionTypeModule } from './question-type/question-type.module';
import { AnswerService } from './answer/answer.service';
import { AnswerController } from './answer/answer.controller';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    UserModule, 
    GenreModule, QuestionModule, SectionModule, SurveyModule, ResponseModule, SegmentModule,
  // TypeOrmModule.forRootAsync({}) // trigger error ;; 
  // TypeOrmModule.forRoot()
  ConfigModule.forRoot(),
  // TypeOrmModule.forRootAsync({ 
  //   useClass: TypeOrmConfigService
  // })
  TypeOrmModule.forRoot({ 
    type: 'mysql',
    host: 'us-cdbr-east-06.cleardb.net',
    port: 3306,
    username: 'bce8ef11b95d3a',
    password: 'c3fa51f1',
    database: 'heroku_3df4ab91447196b',
    synchronize: false

// DB_HOST=us-cdbr-east-06.cleardb.net
// DB_PORT=3306
// DB_USERNAME=bce8ef11b95d3a
// DB_PASSWORD=c3fa51f1
// DB_NAME=heroku_3df4ab91447196b

  }),
  SelectableOptionModule,
  SectionBridgeModule,
  QuestionTypeModule,
  AnswerModule
  // TypeOrmModule.forRootAsync({
  //   useClass: TypeOrmConfigService
  // })
  // TypeOrmConfigService.forRoot(),
  ],
  controllers: [AppController, AnswerController],
  providers: [AppService, AuthService, AnswerService],
})
export class AppModule {}
