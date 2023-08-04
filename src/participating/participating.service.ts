import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participating } from './participating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipatingService {
	constructor(@InjectRepository(Participating) private repo: Repository<Participating>) {}

	async create(survey_id: number, user_id: number) { 
		const participating = this.repo.create({survey_id, user_id})
		return await this.repo.save(participating)
	}

	// SurveyId 로 조회하는거 필요해. admin 에게
	async getParticipatedUsersBySurveyId(survey_id: number) { 
		return await this.repo.find({where: {survey_id}})
	}

	// UserId 로 조회하는거 필요함. (참여한 것들 sort out)
	async getParticipatedSurveysByUserId(user_id: number) { 
		return await this.repo.find({where: {user_id}})
	}
}