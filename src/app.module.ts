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
// import { TypeOrmConfigService } from './typeorm.config';
import { ConfigModule } from '@nestjs/config';
// import { AuthService } from './user/auth.service';
import { AuthService } from './user/auth/auth.service';
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
import { SelectableOption } from './selectable-option/selectable-option.entity';
import { Survey } from './survey/survey.entity';
import { GenreService } from './genre/genre.service';
import { GenreController } from './genre/genre.controller';
import { UserController } from './user/user.controller';
// import { config } from 'process';
import { config } from './config';
import { DatabaseConfig } from './database.config';

import { UserGenreService } from './user_genre/user_genre.service';
import { UserGenreModule } from './user_genre/user_genre.module';

import { SurveyGenreService } from './survey_genre/survey_genre.service';
import { SurveyGenreModule } from './survey_genre/survey_genre.module';
import { PostingService } from './posting/posting.service';
import { PostingModule } from './posting/posting.module';
import { ParticipatingService } from './participating/participating.service';
import { ParticipatingModule } from './participating/participating.module';
import { QuestionController } from './question/question.controller';
import { QuestionTypeController } from './question-type/question-type.controller';
import { ResponseController } from './response/response.controller';
import { SectionController } from './section/section.controller';
import { SegmentController } from './segment/segment.controller';
import { SelectableOptionController } from './selectable-option/selectable-option.controller';
import { SurveyController } from './survey/survey.controller';
import { QuestionService } from './question/question.service';
import { QuestionTypeService } from './question-type/question-type.service';
import { ResponseService } from './response/response.service';
import { SectionService } from './section/section.service';
import { SectionBridgeService } from './section-bridge/section-bridge.service';
import { SegmentService } from './segment/segment.service';
import { SelectableOptionService } from './selectable-option/selectable-option.service';
import { SurveyService } from './survey/survey.service';
import { UserGenre } from './user_genre/user_genre.entity';
import { Participating } from './participating/participating.entity';
import { Posting } from './posting/posting.entity';
import { SurveyGenre } from './survey_genre/survey_genre.entity';
import { AuthModule } from './user/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { JwtStrategy } from './user/jwt/jwt.strategy';
import { JwtStrategy } from './user/jwt.strategy';
import { AccessToken } from './user/accessToken.entity';
// import { RefreshToken } from './user/jwt/refreshToken.entity';
import { RefreshToken } from './user/refreshToken.entity';
import { SectionBridgeController } from './section-bridge/section-bridge.controller';
import { SurveyGenreController } from './survey_genre/survey_genre.controller';

require('dotenv').config();

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  }),
  JwtModule.register({
    secret: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
    secretOrPrivateKey:'046e13dae9c744286aea80fc54f6f203b1a15e36F'
  }),
  // 이걸 쓰면 에러가 안나고
  TypeOrmModule.forRoot({ 
    type: 'mysql',
    host: 'us-cdbr-east-06.cleardb.net',
    port: 3306,
    username: 'bce8ef11b95d3a',
    password: 'c3fa51f1',
    database: 'heroku_3df4ab91447196b',
    synchronize: false,
    // entities: ['./**/*.entity.js']
    entities: [Genre, Participating, Posting, Question, QuestionType, Response, Section, SectionBridge, Segment, SelectableOption, Survey, SurveyGenre, User, UserGenre, AccessToken, RefreshToken]
  }),
  
  TypeOrmModule.forFeature([
    Genre, Participating, Posting, Question, QuestionType, Response, Section, SectionBridge, Segment, SelectableOption, Survey, SurveyGenre, User, UserGenre, AccessToken, RefreshToken
  ]),

  // 이걸 쓰면 에러가 난다. 왜그럴까 ? 
  // TypeOrmModule.forRootAsync({
  //   imports: [ConfigModule],
  //   useClass: DatabaseConfig
  //   // useClass: config
  // }),

  SegmentModule,
  AnswerModule, 
  GenreModule,
  QuestionModule,
  QuestionTypeModule,
  ResponseModule,
  SectionModule,
  SectionBridgeModule,
  SegmentModule,
  SelectableOptionModule,
  SurveyModule,
  UserModule,
  UserGenreModule,
  SurveyGenreModule,
  PostingModule,
  ParticipatingModule,
  AuthModule,
  JwtModule

  // TypeOrmModule.forRootAsync({
  //   useClass: TypeOrmConfigService
  // })
  // TypeOrmConfigService.forRoot(),
  
  ],
  controllers: [
    AppController, 
    AnswerController, 
    GenreController, 
    QuestionController,
    QuestionTypeController,
    ResponseController,
    SectionController,
    SegmentController,
    SelectableOptionController,
    SurveyController,
    SurveyGenreController,
    UserController,
    SectionBridgeController
  ],
  providers: [AppService, 
    AuthService, 
    AnswerService, 
    GenreService, 
    QuestionService,
    QuestionTypeService,
    ResponseService,
    SectionService,
    SectionBridgeService,
    SegmentService,
    SelectableOptionService,
    JwtService,
    JwtStrategy,
    SurveyService,
    UserService, 
    UserGenreService, 
    SurveyGenreService, 
    PostingService, 
    ParticipatingService],
})
export class AppModule {}
