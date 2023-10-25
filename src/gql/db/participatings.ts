// import { connection} from './connection'
// import { NotFoundError } from 'rxjs';
// import { GraghQLError } from 'graphql'
import { Participating } from 'src/participating/participating.entity';
import { connection } from './connection';
import { getMatchedSurveys } from './surveys';
import logObject from 'src/util/logObject';

// 이전: 2afe386a37ef6b5448657983612ff05b8781df90
// 이후: 3c1f102ddfc29a54f2c203cd793c9c4358a889f5
const getParticipatingTable = () =>
  connection.table<Participating>('participating');

export async function getParticipatings() {
  return await getParticipatingTable(); // 싹다 가져오기!
}

export async function getParticipatingsBySurveyId(survey_id: number) {
  // const participatings = (await getParticipatingTable()).filter(
  //   (participating) => participating.survey_id === survey_id,
  // );

  const participatings = await getParticipatings();
  return participatings;
}

export async function getParticipatedSurveysByUserId(user_id: number) {
  const matchedSurveyIds = (await getParticipatingTable()).map(
    (participating) => participating.survey_id,
  );
  logObject('matchedSurveyIds', matchedSurveyIds);
  const matchedSurveys = await getMatchedSurveys(matchedSurveyIds);
  return matchedSurveys;
}
