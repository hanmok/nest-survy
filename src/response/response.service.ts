import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './response.entity';
import { Repository } from 'typeorm';
import { CreateResponseDTO } from './createResponseDTO';

@Injectable()
export class ResponseService {
	constructor(@InjectRepository(Response) private repo: Repository<Response>) {}

	async createResponse(createResponseDTO: CreateResponseDTO) { 
		const response = this.repo.create(createResponseDTO)
		return await this.repo.save(response)
	}

	async getResponse(survey_id: number, question_id: number) { 
		// return await this.repo.find({survey_id, question_id})
		return await this.repo.find({where: {survey_id: survey_id, question_id: question_id}})
	}
}
