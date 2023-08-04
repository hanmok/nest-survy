import { Injectable } from '@nestjs/common';
import { QuestionType } from './questionType.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionTypeService {
	constructor(@InjectRepository(QuestionType) private repo: Repository<QuestionType>) {}

	async create(description: string) { 
		const questionType = this.repo.create({description})
		return await this.repo.save(questionType)
	}

	async getAll() { 
		return await this.repo.find()
	}
}
