import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyGeo } from 'src/question_type/survey-geo.entity';
import { SurveyGeoService } from './survey_geo.service';
import { SurveyGeoController } from './survey_geo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyGeo])],
  providers: [SurveyGeoService],
  controllers: [SurveyGeoController],
})
export class SurveyGeoModule {}
