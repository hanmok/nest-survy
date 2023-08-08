import { Inject, Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDTO } from './createQuestion.dto';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { Response } from 'src/response/response.entity';

@Injectable()
export class QuestionService {
	constructor(
		@InjectRepository(Question) private repo: Repository<Question>, 
		@InjectRepository(SelectableOption) private selectableOptionRepo: Repository<SelectableOption>,
		@InjectRepository(Response) private responseRepo: Repository<Response>
		) {}

		async getAll() { 
			return await this.repo.find()
		}

		async create(questionDTO: CreateQuestionDTO ) { 
			const question = this.repo.create(questionDTO)
			return await this.repo.save(question)
		}

		async findById(id: number) { 
			return await this.repo.findOneBy({id})
		}
		
		async getSelectableOptionsByCurrentId(question_id: number) { 
			return await this.selectableOptionRepo.find({where: {question_id}})
		}

		async getResponsesByQuestionId(question_id: number) { 
			return await this.responseRepo.find({where: {question_id}})
		}
}
