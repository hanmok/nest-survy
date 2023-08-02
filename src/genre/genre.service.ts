import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
	constructor(@InjectRepository(Genre) private repo: Repository<Genre>) {}

	create(name: string) { 
		const genre = this.repo.create({name})
		return this.repo.save(genre);
	}

	getAll() { 
		return this.repo.find()
	}


}
