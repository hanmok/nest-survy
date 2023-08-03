import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
	constructor(@InjectRepository(Survey) private repo: Repository<Survey>) {}

	getAll() { 
		return this.repo.find()
	}

	findOne(id: number) { 
		if (!id) { 
			return null
		}
		return this.repo.findOneBy({id});
	}

	create(title: string, participationGoal: number) { 
		const survey = this.repo.create({title, participationGoal})
		return this.repo.save(survey)
	}
	
}
