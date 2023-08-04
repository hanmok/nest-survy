import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posting } from './posting.entity';
// import { PostEntity } from './post.entity';


// 내가 올린 survey 보고싶어. 
// 모든 사람이 올린건 볼 필요가 없음. 봐서도 안되고. 
@Injectable()
export class PostingService {
	constructor(@InjectRepository(Posting) private repo: Repository<Posting>) {}

	async create(survey_id: number, user_id: number) { 
		const posting = this.repo.create({survey_id, user_id})
		return await this.repo.save(posting)
	}

	async getPostedSurveysByUserId(user_id) { 
		return await this.repo.find({where: {user_id}})
	}

	// admin 
	async getAll() { 
		return await this.repo.find()
	}
} 