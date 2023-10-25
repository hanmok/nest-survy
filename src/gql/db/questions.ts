// import { SelectableOption } from './../../selectable-option/selectable-option.entity';
// import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';
import { connection } from '../connection';
const DataLoader = require('dataloader');
const getQuestionTable = () => connection.table<Question>('question');

// export async function getQuestionById(id) {
//   return await getQuestionTable().first().where({ id });
// }

export async function getQuestionsBySectionId(section_id) {
  return await getQuestionTable()
    .select()
    .where({ section_id: parseInt(section_id) });
}

export async function getQuestionById(id) {
  return await getQuestionTable().first().where({ id });
}

export const questionLoader = new DataLoader(async (ids) => {
  console.log('[questionLoader] ids:', ids);
  const readonlyIds: readonly string[] = ids as readonly string[];
  const questions = await getQuestionTable()
    .select()
    .whereIn('id', readonlyIds);
  return readonlyIds.map((id) =>
    questions.find((question) => question.id === parseInt(id)),
  );
});

// export async function getQuestionsBy
