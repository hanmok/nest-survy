import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
	constructor(@InjectRepository(Genre) private repo: Repository<Genre>) {}

	async create(name: string) { 
		console.log(`input: ${name}`)
		if (name) {
			// 중복 있는지 확인해봐야함
			const prev = await this.repo.find({where:{name}})

			if (prev.length) { 
				throw new ConflictException(`genre ${name} already exists`)
			}
			const genre = this.repo.create({name})
			return this.repo.save(genre);
		} else { 
			throw new BadRequestException('empty string')
		}
	}

	findOne(id: number) { 
		if(!id) {
			return null
		}
		return this.repo.findOneBy({id});
	}

	getAll() { 
		return this.repo.find()
	}
}
