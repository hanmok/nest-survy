import { QuestionType } from 'src/question_type/question-type.entity';
import { connection } from './connection';

const getQuestionTypeTable = () =>
  connection.table<QuestionType>('question_type');

export async function getQuestionTypeById(id) {
  return await getQuestionTypeTable().first().where({ id });
}
