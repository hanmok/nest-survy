import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';
import { createRandomAlphabets } from '../util/createRandomAlphabets';
import { SurveyDto } from './survey.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { log } from 'console';
import logObject from 'src/util/logObject';
import { convertToKoreanDate, sortStringInDecendingOrder } from 'src/date';
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
    logObject('surveys', surveys); // 포함되어있음

    let surveyEntities: Survey[];

    if (availableOnly) {
      surveyEntities = await this.repo.find({ where: { is_completed: 0 } });
    } else {
      surveyEntities = await this.repo.find();
    }

    // logObject('surveyEntities', surveyEntities); // 없음
    // logObject('surveys', surveyEntities);

    // const surveyDtos: SurveyDto[] = surveyEntities.map((survey) =>
    // const surveyDtos: SurveyDto[] = surveys.map((survey) => {
    //   // survey.created_at = convertToKoreanDate(survey.created_at)
    //   survey.created_at = '';
    //   return plainToInstance(SurveyDto, survey);
    // });
    // logObject('survey dtos', surveyDtos); // 없음

    // 정렬된 결과
    // surveyDtos.sort((a, b) => {
    surveys.sort((a, b) => {
      log(`surveyA: ${a.title}, created_at: ${a.created_at}`);
      log(`surveyB: ${b.title}, created_at: ${b.created_at}`);
      return sortStringInDecendingOrder(a.created_at, b.created_at, true);
    });

    const surveyDtos: SurveyDto[] = surveys.map((survey) => {
      const koreanDateString = survey.created_at.toString();

      // Sat Dec 16 2023 10:35:00 GMT+0900 (대한민국 표준시)"
      const originalDate = new Date(koreanDateString);

      const formattedDate = originalDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      // dd/MM/yyyy -> yyyy-MM-dd
      const splitted = formattedDate.split('/');
      const formatted = splitted[2] + '-' + splitted[1] + '-' + splitted[0];

      survey.created_at = formatted;
      console.log(formatted);
      return plainToInstance(SurveyDto, survey);
    });

    logObject('surveyDto', surveyDtos);

    return surveyDtos;
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
