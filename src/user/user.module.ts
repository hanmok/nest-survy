import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { AuthService } from './auth.service';
import { AuthService } from './auth/auth.service';
import { UserGenre } from 'src/user_genre/user_genre.entity';
import { Posting } from 'src/posting/posting.entity';
import { Participating } from 'src/participating/participating.entity';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from './accessToken.entity';
// import { RefreshToken } from './jwt/refreshToken.entity';
import { RefreshToken } from './refreshToken.entity';
import { CustomResponseDto } from 'custom-response.dto';
import { ApiResponseService } from 'api-response.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, 
    UserGenre, 
    Posting, 
    Participating, 
  AccessToken, 
  RefreshToken, 
  CustomResponseDto
  ]), 
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false
    }),
    // JwtModule.register({
    //   secret: '046e13dae9c744286aea80fc54f6f203b1a15e36'
    // })
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ 
        // secret: config.get<string>('JWT_SECRET_KEY')
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36'
      })
    })
  ],
  providers: [UserService, 
    AuthService, 
    JwtService,
    UserGenreService, 
    PostingService, 
    ParticipatingService,
    ApiResponseService
  ],
  controllers: [UserController]
})

// export class UserModule {
//   configure(consumer: MiddlewareConsumer) { 
//     consumer.apply(CurrentUser)
//   }
// }

export class UserModule {}