import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UserGenre } from 'src/user_genre/user_genre.entity';
import { Posting } from 'src/posting/posting.entity';
import { Participating } from 'src/participating/participating.entity';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, 
    UserGenre, 
    Posting, 
    Participating])
  ],
  providers: [UserService, 
    AuthService, 
    JwtService,
    UserGenreService, 
    PostingService, 
    ParticipatingService],
  controllers: [UserController]
})

// export class UserModule {
//   configure(consumer: MiddlewareConsumer) { 
//     consumer.apply(CurrentUser)
//   }
// }

export class UserModule {}