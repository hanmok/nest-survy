import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGenre } from './user_genre.entity';
import { UserGenreService } from './user_genre.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserGenre])], 
	providers: [UserGenreService]
})
export class UserGenreModule {}
