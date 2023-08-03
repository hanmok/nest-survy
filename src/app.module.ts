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
// import { config } from 'process';
import { config } from './config';
import { DatabaseConfig } from './database.config';
// import { UserGenreController } from './user_genre/user_genre.controller';
// import { User}
import { UserGenreService } from './user_genre/user_genre.service';
import { UserGenreModule } from './user_genre/user_genre.module';
import { SurveyGenreController } from './survey_genre/survey_genre.controller';
import { SurveyGenreService } from './survey_genre/survey_genre.service';
import { SurveyGenreModule } from './survey_genre/survey_genre.module';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { ParticipateController } from './participate/participate.controller';
import { ParticipateService } from './participate/participate.service';
import { ParticipateModule } from './participate/participate.module';
import { QuestionController } from './question/question.controller';
import { QuestionTypeController } from './question-type/question-type.controller';
import { ResponseController } from './response/response.controller';
import { SectionController } from './section/section.controller';
import { SectionBridgeController } from './section-bridge/section-bridge.controller';
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

@Module({
  imports: [
    UserModule, 
    GenreModule, QuestionModule, SectionModule, SurveyModule, ResponseModule, SegmentModule,

  ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  }),
  // 이걸 쓰면 에러가 안나고
  // TypeOrmModule.forRoot({ 
  //   type: 'mysql',
  //   host: 'us-cdbr-east-06.cleardb.net',
  //   port: 3306,
  //   username: 'bce8ef11b95d3a',
  //   password: 'c3fa51f1',
  //   database: 'heroku_3df4ab91447196b',
  //   synchronize: false,
  //   // entities:[ User, Genre, Question, QuestionType, Response, Section, SectionBridge, Segment, selectableOption, Survey]
  //   entities: ['./**/*.entity.js']
  // }),
  
  TypeOrmModule.forFeature([
    User, Genre, Question, QuestionType, Response, Section, SectionBridge, Segment, selectableOption, Survey
  ]),

  // 이걸 쓰면 에러가 난다. 왜그럴까 ? 
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: DatabaseConfig
  }),

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
  PostModule,
  ParticipateModule
  
  
  
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
    SectionBridgeController,
    SegmentController,
    SelectableOptionController,
    SurveyController,
    UserController 
    // UserGenreController, 
    // SurveyGenreController, 
    // PostController, 
    // ParticipateController
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
    SurveyService,
    UserService, 
    
    UserGenreService, 
    SurveyGenreService, 
    PostService, 
    ParticipateService],
})
export class AppModule {}
