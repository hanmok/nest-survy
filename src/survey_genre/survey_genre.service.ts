import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey_genre } from './survey_genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyGenreService {
	constructor(@InjectRepository(Survey_genre) private repo: Repository<Survey_genre>) {}

	// genre id 로 surveys 가져오기.
	async getSurveysByGenreId(genre_id) { 
		return await this.repo.find({where: {genre_id}})
	}
	// survey id 로 genres 가져오기

	async getGenresBySurveyId(survey_id) { 
		return await this.repo.find({where: {survey_id}})
	}

	async create(survey_id, genre_id) { 
		const surveyGenre = this.repo.create({genre_id, survey_id})
		return await this.repo.save(surveyGenre)
	}
}