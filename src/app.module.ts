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
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { Genre } from './genre/genre.entity';
import { Question } from './question/question.entity';
import { QuestionType } from './question-type/questionType.entity';
import { Response } from './response/response.entity';
import { Section } from './section/section.entity';
import { SectionBridge } from './section-bridge/section-bridge.entity';
import { Segment } from './segment/segment.entity';
import { selectableOption } from './selectable-option/selectable-option.entity';
import { Survey } from './survey/survey.entity';
import { GenreService } from './genre/genre.service';
import { GenreController } from './genre/genre.controller';
import { UserController } from './user/user.controller';

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
    synchronize: false,
    entities:[ User, Genre, Question, QuestionType]
  }),
  TypeOrmModule.forFeature([
    User, Genre, Question, QuestionType, Response, Section, SectionBridge, Segment, selectableOption, Survey
  ]),

  SelectableOptionModule,
  SectionBridgeModule,
  QuestionTypeModule,
  AnswerModule, 
  GenreModule
  // TypeOrmModule.forRootAsync({
  //   useClass: TypeOrmConfigService
  // })
  // TypeOrmConfigService.forRoot(),
  ],
  controllers: [AppController, AnswerController, GenreController, UserController],
  providers: [AppService, AuthService, AnswerService, UserService, GenreService],
})
export class AppModule {}
