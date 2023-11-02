import { connection } from '../connection';
import { SurveyGeo } from 'src/survey_geo/survey-geo.entity';

const getSurveyGeoTable = () => connection.table<SurveyGeo>('survey_geo');

export async function getSurveyGeoBySurveyId(survey_id) {
  const survey_geos = (await getSurveyGeoTable()).filter(
    (survey_geo) => survey_geo.survey_id === survey_id,
  );

  return survey_geos;
}

export async function getAllSurveyGeo() {
  return await getSurveyGeoTable();
}
