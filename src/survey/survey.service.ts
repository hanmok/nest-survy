import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';
const randomString = require('randomstring')

@Injectable()
export class SurveyService {
	constructor(@InjectRepository(Survey) private repo: Repository<Survey>) {}

	// 두개 합칠 수 잇을 것 같은데.. 
	// admin 
	async getAll() { 
		// completed 된 것들은 빼기. 
		return await this.repo.find()
	}

	async getAvailableSurveys(availableOnly: boolean) { 
		// completed 된 것들은 빼기. 
		if (availableOnly) { 
			return await this.repo.find({where: {is_completed: 0}})
		}
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
		const randomAlphabets = createRandomAlphabets(7)
		survey.code = randomAlphabets
		return await this.repo.save(survey)
	}

	async increaseParticipatedNumber(id) { 
		const survey = await this.repo.findOne({where: {id}})
		survey.numOfParticipation += 1
		if (survey.numOfParticipation >= survey.participationGoal) { 
			survey.is_completed = 1
		}

		return await this.repo.save(survey)

	}
}

function createRandomAlphabets(length: number): string { 
	const randomAlphabets = randomString.generate({ 
		length: length, 
		charset: 'alphabetic',
		capitalization: 'uppercase'
	})
	return randomAlphabets
}