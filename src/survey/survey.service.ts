import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';
import { createRandomAlphabets } from '../util/createRandomAlphabets';
import { SurveyDto } from './survey.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { log } from 'console';
import logObject from 'src/util/logObject';
// import { createRandomAlphabets } from '../util/createRandomAlphabets';

const randomString = require('randomstring');

@Injectable()
export class SurveyService {
  constructor(@InjectRepository(Survey) private repo: Repository<Survey>) {}

  // 두개 합칠 수 잇을 것 같은데..
  // admin
  async getAll() {
    // completed 된 것들은 빼기.
    const surveyEntities = await this.repo.find();
    const surveys: SurveyDto[] = plainToInstance(SurveyDto, surveyEntities, {
      // excludeExtraneousValues: true,
    });
    return surveys;
  }

  async getAvailableSurveys(availableOnly: boolean) {
    // completed 된 것들은 빼기.

    const surveys = await this.repo
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.genres', 'genre')
      .getMany();

    // console.log(surveys[0].created_at);
    // logObject('elements: ', surveys);

    // surveys.sort((s1, s2) => s1.created_at)

    // return surveys;

    let surveyEntities: Survey[];
    // let surveyDtos: SurveyDto[];
    if (availableOnly) {
      surveyEntities = await this.repo.find({ where: { is_completed: 0 } });
    } else {
      surveyEntities = await this.repo.find();
    }
    logObject('surveys', surveyEntities);

    const surveyDtos: SurveyDto[] = surveyEntities.map((survey) =>
      plainToInstance(SurveyDto, survey),
    );
    logObject('returning dtos', surveyDtos);

    return surveyDtos;
    // return surveyEntities;

    // const surveys: SurveyDto[] = plainToInstance(SurveyDto, surveyEntities, {
    //   // excludeExtraneousValues: true,
    // });

    // return surveys;
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.repo.findOneBy({ id });
  }

  async create(title: string, participationGoal: number) {
    const survey = this.repo.create({
      title,
      participation_goal: participationGoal,
    });
    const randomAlphabets = createRandomAlphabets(7);
    survey.code = randomAlphabets;
    return await this.repo.save(survey);
  }

  // async increaseParticipatedNumber(id) {
  //   const survey = await this.repo.findOne({ where: { id } });
  //   survey.current_participation += 1;
  //   if (survey.current_participation >= survey.participation_goal) {
  //     survey.is_completed = 1;
  //   }
  //   return await this.repo.save(survey);
  // }

  async addInitialSectionId(survey_id, section_id) {
    const survey = await this.repo.findOne({ where: { id: survey_id } });
    // survey.initial_section_id = section_id;
    return await this.repo.save(survey);
  }
}
