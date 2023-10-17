import { Answer } from 'src/answer/answer.entity';
import { connection } from './db/connection';
import logObject from 'src/util/logObject';

const getAnswerTable = () => connection.table<Answer>('answer');

export async function getAnswers() {
  return await getAnswerTable();
}

export async function getAnswersBySurveyId(id: number) {
  //   const ret = await getAnswers();
  const ret = (await getAnswers()).filter((answer) => answer.survey_id === id);

  logObject('returning answers:', ret);
  return ret;
  //   return (await getAnswerTable()).filter((ans) => ans.survey_id === id);
  //   return await getAnswerTable().first().where({string(id)})
}
