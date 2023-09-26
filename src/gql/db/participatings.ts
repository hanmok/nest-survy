// import { connection} from './connection'
// import { NotFoundError } from 'rxjs';
// import { GraghQLError } from 'graphql'
import { connection } from './connection';
// import { GraphQLError}
const getParticipatingTable = () => connection.table('participating');

export async function getParticipatedSurveys() {
  return await getParticipatingTable(); // 싹다 가져오기!
}

export async function getParticipatedSurveysByUserId({ user_id }) {
  return (await getParticipatingTable()).filter((p) => p.user_id === user_id);
}
