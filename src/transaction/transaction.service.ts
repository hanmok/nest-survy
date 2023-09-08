import { PostingService } from '../posting/posting.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../survey/survey.entity';
import { createRandomAlphabets } from '../util/createRandomAlphabets';
import { Repository, DataSource, QueryFailedError } from 'typeorm';
import { Posting } from '../posting/posting.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Survey) private surveyRepo: Repository<Survey>,
    @InjectRepository(Posting) private postingRepo: Repository<Posting>,
    private dataSource: DataSource,
  ) {}

  // Create Survey, connect using 'Posting'
  async createSurvey(
    title: string,
    participationGoal: number,
    user_id: number,
  ) {
    // create Survey
    const tempSurvey = this.surveyRepo.create({
      title,
      participation_goal: participationGoal,
    });
    tempSurvey.code = createRandomAlphabets(7);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 여기서 실패할 수도 있어? 음.. 불가능할텐데 ?
      const survey = await queryRunner.manager.save(Survey, tempSurvey);

      // create Posting
      const posting = await this.postingRepo.create({
        survey_id: survey.id,
        user_id,
      });

      await queryRunner.manager.save(Posting, posting);
      console.log(`transaction committed!!`);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(`err: ${err}`);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }
}
