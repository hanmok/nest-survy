import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { selectableOption } from './selectable-option.entity';
import { Repository } from 'typeorm';
import { selectableOptionDTO } from './selectable-option.dto';

@Injectable()
export class SelectableOptionService {
	constructor(@InjectRepository(selectableOption) private repo: Repository<selectableOption>) {}

	async create(createDTO: selectableOptionDTO) { 
		const selectableOption = this.repo.create(createDTO)
		return await this.repo.save(selectableOption)
	}

	async findByQuestionId(question_id) { 
		return await this.repo.find({where: {question_id}})
	}

	// admin
	async adminFindAll() { 
		return await this.repo.find()
	}
	
	

}
