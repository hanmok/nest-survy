import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGenre } from './user_genre.entity';
import { UserGenreService } from './user_genre.service';
import { UserGenreController } from './user_genre.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserGenre])], 
	providers: [UserGenreService], controllers: [UserGenreController]
})
export class UserGenreModule {}
