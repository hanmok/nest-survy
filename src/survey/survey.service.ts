import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
	constructor(@InjectRepository(Survey) private repo: Repository<Survey>) {}

	async getAll() { 
		return await this.repo.find()
	}

	async findOne(id: number) { 
		if (!id) { 
			return null
		}
		return await this.repo.findOneBy({id});
	}

	async create(title: string, participationGoal: number) { 
		const survey = this.repo.create({title, participationGoal})
		return await this.repo.save(survey)
	}
}
