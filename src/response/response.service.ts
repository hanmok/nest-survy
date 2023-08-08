import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './response.entity';
import { Repository } from 'typeorm';
import { CreateResponseDTO } from './createResponse.dto';

@Injectable()
export class ResponseService {
	constructor(@InjectRepository(Response) private repo: Repository<Response>) {}

	async getAll() { 
		return await this.repo.find()
	}

	async createResponse(createResponseDTO: CreateResponseDTO) { 
		const response = this.repo.create(createResponseDTO)
		return await this.repo.save(response)
	}
}
