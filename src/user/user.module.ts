import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UserGenre } from 'src/user_genre/user_genre.entity';
import { PostEntity } from 'src/post/postEntity';
import { Participate } from 'src/participate/participate.entity';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { PostService } from 'src/post/post.service';
import { ParticipateService } from 'src/participate/participate.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, 
    UserGenre, 
    PostEntity, 
    Participate])
  ],
  providers: [UserService, 
    AuthService, 
    UserGenreService, 
    PostService, 
    ParticipateService],
  controllers: [UserController]
})

// export class UserModule {
//   configure(consumer: MiddlewareConsumer) { 
//     consumer.apply(CurrentUser)
//   }
// }

export class UserModule {}