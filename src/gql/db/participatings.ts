// import { connection} from './connection'
// import { NotFoundError } from 'rxjs';
// import { GraghQLError } from 'graphql'
import { Participating } from 'src/participating/participating.entity';
import { connection } from './connection';
import { getMatchedSurveys } from './surveys';

const getParticipatingTable = () =>
  connection.table<Participating>('participating');

export async function getParticipatedSurveys() {
  return await getParticipatingTable(); // 싹다 가져오기!
}

export async function getParticipatedSurveysByUserId(user_id: number) {
  const matchedSurveyIds = (await getParticipatingTable())
    .filter((participating) => participating.user_id === user_id)
    .map((participating) => participating.survey_id);
  const matchedSurveys = await getMatchedSurveys(matchedSurveyIds);
  return matchedSurveys;
}
