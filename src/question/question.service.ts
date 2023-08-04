import { Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDTO } from './createQuestion.dto';

@Injectable()
export class QuestionService {
	constructor(@InjectRepository(Question) private repo: Repository<Question>){}

		async create(questionDTO: CreateQuestionDTO ) { 

			// const question = this.repo.create(questionType_id, section_id, position, text, expectedTimeInSec)
			const question = this.repo.create(questionDTO)
			return await this.repo.save(question)
		}

		async findById(id: number) { 
			return await this.repo.findOneBy({id})
		}
		
			
		
		
	
}
