import { UserGenre } from 'src/user_genre/user_genre.entity';
import { connection } from '../connection';
import { SurveyGenre } from 'src/survey_genre/survey_genre.entity';

const getSurveyGenreTable = () => connection.table<SurveyGenre>('survey_genre');

export async function getSurveyGenreBySurveyId(survey_id) {
  const survey_genres = (await getSurveyGenreTable()).filter(
    (survey_genre) => survey_genre.survey_id === survey_id,
  );

  return survey_genres;
}

export async function getAllSurveyGenre() {
  return await getSurveyGenreTable();
}
