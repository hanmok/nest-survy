import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';
import { createRandomAlphabets } from '../util/createRandomAlphabets';
import { SurveyDto } from './survey.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { log } from 'console';
import logObject from 'src/util/logObject';
import { sortStringInDecendingOrder } from 'src/date';
import { Participating } from 'src/participating/participating.entity';
import { User } from 'src/user/user.entity';
import { hasCommonElements } from 'src/util/SetDictionary';
// import { createRandomAlphabets } from '../util/createRandomAlphabets';

const randomString = require('randomstring');

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private repo: Repository<Survey>,
    @InjectRepository(Participating)
    private participatingRepo: Repository<Participating>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

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

  async getAvailableSurveys(availableOnly: boolean, userId?: number) {
    // completed 된 것들은 빼기.

    let surveys = await this.repo
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.genres', 'genre')
      .getMany();

    logObject('surveys', surveys); // 포함되어있음

    let surveyEntities: Survey[];

    // genres
    // geos

    if (availableOnly) {
      const currentUser = await this.userRepo.findOneBy({ id: userId });

      const participatedSurveysSet = new Set(
        (await this.participatingRepo.find({ where: { user_id: userId } })).map(
          (p) => p.survey_id,
        ),
      );
      surveys = surveys.filter(
        (
          survey, // set 에 포함되어있으면 안됨. & completed 가 0 이어야함.
        ) => {
          const geoCodes = survey.geos.map((geo) => geo.code);
          const geoCodeSet = new Set(geoCodes);

          const surveyGenres = new Set(survey.genres.map((genre) => genre.id));
          const userGenres = new Set(
            currentUser.genres.map((genre) => genre.id),
          );

          participatedSurveysSet.has(survey.id) === false &&
            survey.is_completed === 0 &&
            (currentUser.is_male === survey.is_target_male ||
              survey.is_target_male === null) &&
            currentUser.age <= survey.target_max_age &&
            currentUser.age >= survey.target_min_age &&
            (hasCommonElements(surveyGenres, userGenres) ||
              surveyGenres.has(100)) && // 1: 일반
            (geoCodeSet.has(currentUser.home_address) ||
              geoCodeSet.has(currentUser.office_address) ||
              geoCodeSet.has(100)); // 전국

          // TODO: 시 포함시키기..
          // 5_100_000_000
          // 전체 시의 경우, 앞 두자리가 일치. 나머지는 다를 것.
          // 함수로 만들어야것네..
          // 이거.. 꼭 필요해?
          // 이거 하나때문에 survey 하나 가져오는 데에 시간이 너무 오래걸리는건 아니야? -> 진짜 오래걸리는지 봐야함.

          // TODO: add conditions for geo,
          // survey.geos.find

          // survey.
          // currentUser.home_address
          // currentUser.office_address
        },
      );
    }

    logObject('surveyEntities', surveyEntities); // 없음

    // const surveyDtos: SurveyDto[] = surveyEntities.map((survey) =>
    const surveyDtos: SurveyDto[] = surveys.map((survey) =>
      plainToInstance(SurveyDto, survey),
    );
    logObject('survey dtos', surveyDtos); // 없음

    // 정렬된 결과
    surveyDtos.sort((a, b) =>
      sortStringInDecendingOrder(a.created_at, b.created_at, true),
    );

    return surveyDtos;
  }

  async findOneById(id: number) {
    if (!id) {
      return null;
    }
    return await this.repo.findOneBy({ id });
  }

  async findOneByCode(code: string) {
    if (!code) {
      return null;
    }
    // return await this.repo.findOneBy({ code });
    return await this.repo
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.genres', 'genre')
      .where({ code })
      .getOne();
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
