import { connection } from './connection';
import { getSurveyById, getMatchedSurveys } from './surveys';
import { Posting } from 'src/posting/posting.entity';

const getPostingTable = () => connection.table<Posting>('posting');

export async function getPostings() {
  return await getPostingTable();
}

export async function getPostedSurveysByUserId(user_id: number) {
  const matchedSurveyIds = (await getPostingTable())
    .filter((posting) => posting.user_id === user_id)
    .map((posting) => posting.survey_id);
  const matchedSurveys = await getMatchedSurveys(matchedSurveyIds);
  return matchedSurveys;
}
