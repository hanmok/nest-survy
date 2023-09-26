// import { connection} from './connection'
import { Survey } from 'src/survey/survey.entity';
import { connection } from './connection';

const getSurveyTable = () => connection.table<Survey>('survey');

export async function getSurveys() {
  return await getSurveyTable();
}

export async function getSurvey(id) {
  return await getSurveyTable().first().where({ id });
}

export async function getMatchedSurveys(ids: number[]) {
  const idSet = new Set(ids.map(Number));
  return (await getSurveyTable()).filter((survey) => idSet.has(survey.id));
}
