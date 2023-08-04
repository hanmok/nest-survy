import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './postEntity';
// import { PostEntity } from './post.entity';


// 내가 올린 survey 보고싶어. 
// 모든 사람이 올린건 볼 필요가 없음. 봐서도 안되고. 
@Injectable()
export class PostService {
	constructor(@InjectRepository(PostEntity) private repo: Repository<PostEntity>) {}

	async create(survey_id: number, user_id: number) { 
		const post = this.repo.create({survey_id, user_id})
		return await this.repo.save(post)
	}

	async getPostedSurveysByUserId(user_id) { 
		return await this.repo.find({where: {user_id}})
	}

	// admin 
	async getAll() { 
		return await this.repo.find()
	}
} 