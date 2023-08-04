import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participate } from './participate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipateService {
	constructor(@InjectRepository(Participate) private repo: Repository<Participate>) {}

	create(survey_id: number, user_id: number) { 
		const participate = this.repo.create({survey_id, user_id})
		return this.repo.save(participate)
	}

	// SurveyId 로 조회하는거 필요해. admin 에게
	getParticipatedUsersBySurveyId(survey_id: number) { 
		return this.repo.find({where: {survey_id}})
	}

	// UserId 로 조회하는거 필요함. (참여한 것들 sort out)
	getParticipatedSurveysByUserId(user_id: number) { 
		return this.repo.find({where: {user_id}})
	}
}