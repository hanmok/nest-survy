import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_genre } from './user_genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserGenreService {
	constructor(@InjectRepository(User_genre) private repo: Repository<User_genre>) {}

	// user id 로 genre 가져오기.
	getGenresByUserId(user_id) { 
		return this.repo.find({where: {user_id}})
	}

	// user id 로 genre 추가하기. 
	create(user_id, genre_id) { 
		const userGenre = this.repo.create({user_id, genre_id})
		return this.repo.save(userGenre)
	}
} 