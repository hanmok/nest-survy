import { PostingService } from 'src/posting/posting.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/survey/survey.entity';
import { createRandomAlphabets } from 'src/util/createRandomAlphabets';
import { Repository, DataSource } from 'typeorm';
import { Posting } from 'src/posting/posting.entity';

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Survey) private surveyRepo: Repository<Survey>, 
		@InjectRepository(Posting) private postingRepo: Repository<Posting>,
	private dataSource: DataSource
	
	) {}

	// Create Survey, connect using 'Posting'
	async createSurvey(title: string, participationGoal: number, user_id: number) { 

		// create Survey
		const survey = this.surveyRepo.create({title, participationGoal})
		survey.code = createRandomAlphabets(7)
		
		// create Posting
		const posting = await this.postingRepo.create({survey_id: survey.id, user_id})

		const queryRunner = this.dataSource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()
		
		try { 
			await queryRunner.manager.save(Survey, survey)
			await queryRunner.manager.save(Posting, posting)
			await queryRunner.commitTransaction()
		} catch (err) { 
			await queryRunner.rollbackTransaction()
		} finally { 
			await queryRunner.release()
		}
	}
}
