import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { AuthService } from './auth.service';
import { AuthService } from './auth/auth.service';
// import { UserGenre } from '../user_genre/user_genre.entity';
import { UserGenre } from '../user_genre/user_genre.entity';
import { Posting } from '../posting/posting.entity';
import { Participating } from '../participating/participating.entity';
import { UserGenreService } from '../user_genre/user_genre.service';
import { PostingService } from '../posting/posting.service';
import { ParticipatingService } from '../participating/participating.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from './refreshToken.entity';
import { Genre } from 'src/genre/genre.entity';
import { Geo } from 'src/geo/geo.entity';
import { GeoService } from 'src/geo/geo.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserGenre,
      Posting,
      Participating,
      RefreshToken,
      Genre,
      Geo,
      // CustomResponseDto,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    // JwtModule.register({
    //   secret: '046e13dae9c744286aea80fc54f6f203b1a15e36'
    // })
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // secret: config.get<string>('JWT_SECRET_KEY')
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
      }),
    }),
  ],
  providers: [
    UserService,
    AuthService,
    JwtService,
    UserGenreService,
    PostingService,
    ParticipatingService,
    GeoService,
    MailService,
    // ApiResponseService,
  ],
  controllers: [UserController],
})

// export class UserModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CurrentUser)
//   }
// }
export class UserModule {}
