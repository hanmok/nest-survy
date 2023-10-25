// import { connection} from './connection'
import { Survey } from 'src/survey/survey.entity';
import { connection } from '../connection';
const DataLoader = require('dataloader');

const getSurveyTable = () => connection.table<Survey>('survey');

export async function getSurveys() {
  return await getSurveyTable();
}

export async function getSurveyById(id) {
  return await getSurveyTable().first().where({ id });
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
