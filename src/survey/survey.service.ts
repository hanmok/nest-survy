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
import { compareGeoCode, hasCommonElements } from 'src/util/SetDictionary';
import { Geo } from 'src/geo/geo.entity';
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
    @InjectRepository(Geo)
    private geoRepo: Repository<Geo>,
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

    const geos = await this.geoRepo.find();

    let surveys = await this.repo
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.genres', 'genre')
      .leftJoinAndSelect('survey.geos', 'geo')
      .getMany();

    logObject('surveys', surveys); // 포함되어있음

    let surveyEntities: Survey[];

    if (availableOnly) {
      const currentUser = await this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.genres', 'genre')
        .where('user.id = :userId', { userId })
        // .findOneBy({ id: userId });
        .getOne();

      const participatedSurveysSet = new Set(
        (await this.participatingRepo.find({ where: { user_id: userId } })).map(
          (p) => p.survey_id,
        ),
      );

      surveys = surveys.filter(
        (
          survey, // set 에 포함되어있으면 안됨. & completed 가 0 이어야함.
        ) => {
          const geoIds = survey.geos.map((geo) => geo.id);
          const geoIdSet = new Set(geoIds);
          const geoCodes = geos
            .filter((geo) => geoIdSet.has(geo.id))
            .map((geo) => geo.code);
          const geoCodeSet = new Set(geoCodes);

          const officeId = currentUser.office_address;
          const officeCode = geos.find((geo) => geo.id === officeId)?.code; // 없을 수도 있음.
          const homeId = currentUser.home_address;
          const homeCode = geos.find((geo) => geo.id === homeId)?.code;

          const surveyGenres = new Set(survey.genres.map((genre) => genre.id));
          const userGenres = new Set(
            currentUser.genres.map((genre) => genre.id),
          );

          return (
            participatedSurveysSet.has(survey.id) === false &&
            survey.is_completed === 0 &&
            // gender
            (currentUser.is_male === survey.is_target_male ||
              survey.is_target_male === null) &&
            // age
            currentUser.age <= survey.target_max_age &&
            currentUser.age >= survey.target_min_age &&
            // genre
            (hasCommonElements(surveyGenres, userGenres) ||
              surveyGenres.has(100)) && // 1: 일반
            // geo
            (geoCodeSet.has(100) ||
              compareGeoCode(geoCodeSet, homeCode) ||
              compareGeoCode(geoCodeSet, officeCode)) // 전국
          );
          // null 인 경우는 ?
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
