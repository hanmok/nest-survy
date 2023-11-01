import { QuestionType } from 'src/survey_geo/question-type.entity';
import { connection } from '../connection';
const DataLoader = require('dataloader');
const getQuestionTypeTable = () =>
  connection.table<QuestionType>('question_type');

export async function getQuestionTypeById(id) {
  return await getQuestionTypeTable().first().where({ id });
}

export const questionTypeLoader = new DataLoader(async (ids) => {
  console.log('[questionTypeLoader] ids:', ids);
  const readonlyIds: readonly string[] = ids as readonly string[];
  const questionTypes = await getQuestionTypeTable()
    .select()
    .whereIn('id', readonlyIds);
  return readonlyIds.map((id) =>
    questionTypes.find((questionType) => questionType.id === parseInt(id)),
  );
});
