import { Answer } from 'src/answer/answer.entity';
import { connection } from './db/connection';
import logObject from 'src/util/logObject';

const getAnswerTable = () => connection.table<Answer>('answer');

export async function getAnswers() {
  return await getAnswerTable();
}

export async function getAnswersBySurveyId(id: string) {
  const ret = await getAnswers();

  const some = ret.filter((ans) => {
    const r = ans.survey_id === parseInt(id);
    console.log(
      `ans.survey_id: ${
        ans.survey_id
      }, id: ${id}, result: ${r}, ans type: ${typeof ans.survey_id}, id type: ${typeof id}`,
    );
    return r;
  });

  logObject('returning answers:', some);
  return some;

  //   return (await getAnswerTable()).filter((ans) => ans.survey_id === id);
  //   return await getAnswerTable().first().where({string(id)})
}
