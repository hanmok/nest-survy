import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGenre } from './user_genre.entity';
import { UserGenreService } from './user_genre.service';
import { UserGenreController } from './user_genre.controller';
import { GenreService } from 'src/genre/genre.service';
import { Genre } from 'src/genre/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGenre, Genre])],
  providers: [UserGenreService, GenreService],
  controllers: [UserGenreController],
})
export class UserGenreModule {}
