// import { connection} from './connection'
import { Survey } from 'src/survey/survey.entity';
import { connection } from '../connection';
import { getUserById } from './users';
import logObject from 'src/util/logObject';
import { getUserGenreByUserId } from './user_genre';
import { getAllSurveyGenre, getSurveyGenreBySurveyId } from './survey_genre';
import { getAllSurveyGeo } from './survey_geo';
const DataLoader = require('dataloader');

const getSurveyTable = () => connection.table<Survey>('survey');

export async function getSurveys() {
  return await getSurveyTable();
}

// const matchGeo = (survey_geoCode: number, user_geoCode: number) => {
const matchGeo = ({ survey_geoCode }: { survey_geoCode: number }) => {
  // 두개 타겟 위치가 같거나, survey 에서 전체를 대상으로 함.
  return (
    survey_geoCode === 100 ||
    // survey_geoCode === user_geoCode ||
    // (survey_geoCode / 100_000_000 === user_geoCode / 100_000_000 &&
    survey_geoCode % 100_000_000 === 0
  );

  // if (survey_geoCode === 100 || survey_geoCode === user_geoCode) {
  //   return true
  // } else if (survey_geoCode / 100_000_000 === user_geoCode / 100_000_000 && survey_geoCode % 100_000_000 === 0){
  //   return true
  // }
};

export async function getSurveyById(id) {
  return await getSurveyTable().first().where({ id });
}

export async function getAvailableSurveys(user_id) {
  const user = await getUserById(user_id);
  logObject('fetched user:', user);

  // 모든 genre
  const userGenreIds = (await getUserGenreByUserId(user_id)).map(
    (userGenre) => userGenre.genre_id,
  );
  const user_genreSet = new Set(userGenreIds);
  const surveys_genres = await getAllSurveyGenre();

  const surveys_geos = await getAllSurveyGeo();

  // const user_geoCodes = (await getUserGeoByUserId(user_id)).map(
  //   (ug) => ug.geo_code,
  // );
  // 어..떻게 하지 ??

  return (await getSurveyTable()).filter((survey: Survey) => {
    const genreIds = surveys_genres
      .filter((sg) => sg.survey_id === survey.id)
      .map((sg) => sg.genre_id);

    const survey_geoCodes = surveys_geos
      .filter((sgo) => sgo.survey_id === survey.id)
      .map((sgo) => sgo.geo_code);

    const hasGenreIntersection = genreIds.some((genre_id) =>
      user_genreSet.has(genre_id),
    );
    // const hasGeoIntersection = user_geoCodes.some((user_geoCode) => {
    //   // surveys_geos
    //   return survey_geoCodes.some((survey_geoCode) =>
    //     matchGeo({ survey_geoCode, user_geoCode }),
    //   );
    // });
    // 잠깐만.. Id 를 가져왔지.. Geo Code 를 가져온게 아니잖아..

    return (
      survey.is_completed === 0 &&
      survey.is_public === 1 &&
      survey.is_target_male === user.is_male &&
      user.age <= survey.target_max_age &&
      user.age >= survey.target_min_age &&
      hasGenreIntersection
      // && hasGeoIntersection
    );
  });
}

export const surveyLoader = new DataLoader(async (ids) => {
  console.log('[surveyLoader] ids:', ids);
  const readonlyIds: readonly string[] = ids as readonly string[];
  const surveys = await getSurveyTable().select().whereIn('id', readonlyIds);
  return readonlyIds.map((id) =>
    surveys.find((survey) => survey.id === parseInt(id)),
  );
});

export async function getMatchedSurveys(ids: number[]) {
  const idSet = new Set(ids.map(Number));
  return (await getSurveyTable()).filter((survey) => idSet.has(survey.id));
}
