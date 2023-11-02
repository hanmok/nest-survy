import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { QuestionModule } from './question/question.module';
import { SectionModule } from './section/section.module';
import { SurveyModule } from './survey/survey.module';
import { AnswerModule } from './answer/answer.module';
import { SegmentModule } from './segment/segment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmConfigService } from './typeorm.config';
import { ConfigModule } from '@nestjs/config';
// import { AuthService } from './user/auth.service';
import { AuthService } from './user/auth/auth.service';
import { SelectableOptionModule } from './selectable-option/selectable-option.module';
import { SectionBridgeModule } from './section-bridge/section-bridge.module';

import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { Genre } from './genre/genre.entity';
import { Question } from './question/question.entity';

import { Answer } from './answer/answer.entity';
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

import { AnswerController } from './answer/answer.controller';
import { SectionController } from './section/section.controller';
import { SegmentController } from './segment/segment.controller';
import { SelectableOptionController } from './selectable-option/selectable-option.controller';
import { SurveyController } from './survey/survey.controller';
import { QuestionService } from './question/question.service';

import { AnswerService } from './answer/answer.service';
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

// import { CustomResponseDto } from 'custom-response.dto';
// import { ApiResponseService } from 'api-response.service';

import { TransactionService } from './transaction/transaction.service';
// import { ValidateQuestionTypePipe } from './question/validate-question-type.pipe';
import { CustomAnswerModule } from './custom_answer/custom_answer.module';

import { CreateCustomAnswerDto } from './custom_answer/createCustomAnswer.dto';

import { CustomAnswer } from './custom_answer/custom_answer.entity';
import { CustomAnswerController } from './custom_answer/custom_answer.controller';
import { CustomAnswerService } from './custom_answer/custom_answer.service';
import { ExpectedTimeSpentModule } from './expected-time-spent/expected-time-spent.module';
import { ExpectedTimeSpent } from './expected-time-spent/ExpectedTimeSpent.entity';
import { ExpectedTimeSpentService } from './expected-time-spent/expected-time-spent.service';
import { ExpectedTimeSpentController } from './expected-time-spent/expected-time-spent.controller';
import { GeoModule } from './geo/geo.module';
import { Geo } from './geo/Geo.entity';
import { GeoController } from './geo/geo.controller';
import { GeoService } from './geo/geo.service';
import { SurveyGeoService } from './survey_geo/survey_geo.service';
import { SurveyGeoController } from './survey_geo/survey_geo.controller';
import { SurveyGeoModule } from './survey_geo/survey_geo.module';
import { SurveyGeo } from './survey_geo/survey-geo.entity';
import { UserGeoController } from './user_geo/user_geo.controller';
import { UserGeoModule } from './user_geo/user_geo.module';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import ConfigModule in other modules ince it's been loaded in the root module.
      load: [config],
    }),
    JwtModule.register({
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
      secretOrPrivateKey: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
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
      entities: [
        Genre,
        Participating,
        Posting,
        Question,
        Answer,
        Section,
        SectionBridge,
        Segment,
        SelectableOption,
        Survey,
        SurveyGenre,
        User,
        UserGenre,
        AccessToken,
        RefreshToken,
        // CustomResponseDto,
        CustomAnswer,
        ExpectedTimeSpent,
        Geo,
        SurveyGeo,
      ],
    }),

    TypeOrmModule.forFeature([
      CustomAnswer,
      Genre,
      Participating,
      Posting,
      Question,
      Answer,
      Section,
      SectionBridge,
      Segment,
      SelectableOption,
      Survey,
      SurveyGenre,
      User,
      UserGenre,
      AccessToken,
      RefreshToken,
      ExpectedTimeSpent,
      Geo,
      SurveyGeo,
      // CustomResponseDto,
    ]),

    // 이걸 쓰면 에러가 난다. 왜그럴까 ?
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useClass: DatabaseConfig
    //   // useClass: config
    // }),

    SegmentModule,
    CustomAnswerModule,
    GenreModule,
    QuestionModule,
    AnswerModule,
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
    JwtModule,
    CustomAnswerModule,
    ExpectedTimeSpentModule,
    GeoModule,
    SurveyGeoModule,
    UserGeoModule,

    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService
    // })
    // TypeOrmConfigService.forRoot(),
  ],
  controllers: [
    AppController,
    GenreController,
    QuestionController,
    AnswerController,
    SectionController,
    SegmentController,
    SelectableOptionController,
    SurveyController,
    SurveyGenreController,
    UserController,
    SectionBridgeController,
    CustomAnswerController,
    ExpectedTimeSpentController,
    GeoController,
    SurveyGeoController,
    UserGeoController,
  ],
  providers: [
    AppService,
    AuthService,
    GenreService,
    QuestionService,
    AnswerService,
    SectionService,
    SectionBridgeService,
    SegmentService,
    SelectableOptionService,
    CustomAnswerService,
    JwtService,
    JwtStrategy,
    SurveyService,
    UserService,
    UserGenreService,
    SurveyGenreService,
    PostingService,
    ParticipatingService,
    // ApiResponseService,
    TransactionService,
    ExpectedTimeSpentService,
    GeoService,
    SurveyGeoService,
    // ValidateQuestionTypePipe,
  ],
})
export class AppModule {}
