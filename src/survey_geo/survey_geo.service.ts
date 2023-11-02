import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGeo } from 'src/survey_geo/survey-geo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyGeoService {
  constructor(
    @InjectRepository(SurveyGeo) private repo: Repository<SurveyGeo>,
  ) {}

  async create(survey_id: number, geo_id: number) {
    const survey_geo = this.repo.create({ survey_id, geo_id });
    return await this.repo.save(survey_geo);
  }
}
