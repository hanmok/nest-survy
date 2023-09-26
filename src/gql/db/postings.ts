import { ApolloServerPlugin } from '@apollo/server';
// import { connection} from './connection'
// import { NotFoundError } from 'rxjs';
// import { GraghQLError } from 'graphql'
import { connection } from './connection';
import { getSurvey, getMatchedSurveys } from './surveys';
// import { GraphQLError}
import { Posting } from 'src/posting/posting.entity';

const getPostingTable = () => connection.table<Posting>('posting');

export async function getPostings() {
  return await getPostingTable();
}

export async function getPostingsByUserId(user_id: string) {
  const matchedSurveyIds = (await getPostingTable())
    .filter((posting) => posting.user_id === parseInt(user_id))
    .map((posting) => posting.survey_id);
  const matchedSurveys = await getMatchedSurveys(matchedSurveyIds);
  return matchedSurveys;

  // 여기선 posting return
  // 위에선 survey return
}
