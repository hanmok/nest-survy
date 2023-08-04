import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './postEntity';
// import { PostEntity } from './post.entity';


// 내가 올린 survey 보고싶어. 
// 모든 사람이 올린건 볼 필요가 없음. 봐서도 안되고. 
@Injectable()
export class PostService {
	constructor(@InjectRepository(Post) private repo: Repository<PostEntity>) {}

	create(survey_id: number, user_id: number) { 
		const post = this.repo.create({survey_id, user_id})
		return this.repo.save(post)
	}

	getPostedSurveysByUserId(user_id) { 
		return this.repo.find({where: {user_id}})
	}

	// admin 
	getAll() { 
		return this.repo.find()
	}
} 